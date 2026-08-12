import type { Video } from './types';

const HOME_FEED_STORAGE_KEY = 'youtube-clone-previous-home-feed';

const REMEMBERED_VIDEO_COUNT = 24;
const RETAINED_VIDEO_COUNT = 8;

export const HOME_FEED_PAGE_SIZE = 48;

const createStringHash = (value: string): number => {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const orderVideosBySeed = (videos: readonly Video[], seed: string): Video[] => {
  return [...videos].sort((firstVideo, secondVideo) => {
    const firstRank = createStringHash(`${seed}-${firstVideo.id}`);

    const secondRank = createStringHash(`${seed}-${secondVideo.id}`);

    if (firstRank === secondRank) {
      return firstVideo.id.localeCompare(secondVideo.id);
    }

    return firstRank - secondRank;
  });
};

export const getUniqueHomeVideos = (videos: readonly Video[]): Video[] => {
  const uniqueVideos: Video[] = [];
  const usedVideoIds = new Set<string>();

  for (const video of videos) {
    if (usedVideoIds.has(video.id)) {
      continue;
    }

    usedVideoIds.add(video.id);
    uniqueVideos.push(video);
  }

  return uniqueVideos;
};

export const interleaveVideoGroups = (
  videoGroups: readonly (readonly Video[])[],
): Video[] => {
  const mixedVideos: Video[] = [];

  const maximumGroupLength = Math.max(
    0,
    ...videoGroups.map((videoGroup) => videoGroup.length),
  );

  for (let videoIndex = 0; videoIndex < maximumGroupLength; videoIndex += 1) {
    for (const videoGroup of videoGroups) {
      const video = videoGroup[videoIndex];

      if (video) {
        mixedVideos.push(video);
      }
    }
  }

  return getUniqueHomeVideos(mixedVideos);
};

export const createRefreshableHomeFeedPage = (
  candidateVideos: readonly Video[],
  previousVideoIds: readonly string[],
  seed: string,
): Video[] => {
  const uniqueCandidates = getUniqueHomeVideos(candidateVideos);

  const candidatesById = new Map(
    uniqueCandidates.map((video) => [video.id, video]),
  );

  const rememberedIds = new Set(
    previousVideoIds.slice(0, REMEMBERED_VIDEO_COUNT),
  );

  const previousCandidates = getUniqueHomeVideos(
    previousVideoIds
      .map((videoId) => candidatesById.get(videoId))
      .filter((video): video is Video => video !== undefined),
  );

  const retainedVideos = orderVideosBySeed(
    previousCandidates,
    `${seed}-retained`,
  ).slice(0, RETAINED_VIDEO_COUNT);

  const freshCandidates = orderVideosBySeed(
    uniqueCandidates.filter((video) => !rememberedIds.has(video.id)),
    `${seed}-fresh`,
  );

  const firstGroup: Video[] = [
    ...retainedVideos,
    ...freshCandidates.slice(
      0,
      Math.max(0, REMEMBERED_VIDEO_COUNT - retainedVideos.length),
    ),
  ];

  const firstGroupIds = new Set(firstGroup.map((video) => video.id));

  if (firstGroup.length < REMEMBERED_VIDEO_COUNT) {
    const fallbackVideos = orderVideosBySeed(
      uniqueCandidates.filter((video) => !firstGroupIds.has(video.id)),
      `${seed}-fallback`,
    );

    const requiredVideoCount = REMEMBERED_VIDEO_COUNT - firstGroup.length;

    for (const video of fallbackVideos.slice(0, requiredVideoCount)) {
      firstGroup.push(video);
      firstGroupIds.add(video.id);
    }
  }

  const orderedFirstGroup = orderVideosBySeed(
    firstGroup,
    `${seed}-first-group`,
  );

  const remainingVideos = orderVideosBySeed(
    uniqueCandidates.filter((video) => !firstGroupIds.has(video.id)),
    `${seed}-remaining`,
  );

  return [...orderedFirstGroup, ...remainingVideos].slice(
    0,
    HOME_FEED_PAGE_SIZE,
  );
};

export const createAdditionalHomeFeedPage = (
  candidateVideos: readonly Video[],
  seed: string,
): Video[] => {
  return orderVideosBySeed(getUniqueHomeVideos(candidateVideos), seed).slice(
    0,
    HOME_FEED_PAGE_SIZE,
  );
};

export const readPreviousHomeFeedIds = (): string[] => {
  try {
    const storedValue = sessionStorage.getItem(HOME_FEED_STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      (videoId): videoId is string => typeof videoId === 'string',
    );
  } catch {
    return [];
  }
};

export const rememberHomeFeed = (videos: readonly Video[]): void => {
  try {
    const videoIds = videos
      .slice(0, REMEMBERED_VIDEO_COUNT)
      .map((video) => video.id);

    sessionStorage.setItem(HOME_FEED_STORAGE_KEY, JSON.stringify(videoIds));
  } catch {
    // The feed still works when storage is unavailable.
  }
};
