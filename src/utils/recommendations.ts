import type { RecommendationFilter, Video } from './types';

const MAX_RECOMMENDATIONS = 20;
const MAX_SIMILAR_TITLE_VIDEOS = 2;

const CATEGORY_LABELS: Record<string, string> = {
  '1': 'Film & Animation',
  '2': 'Autos & Vehicles',
  '10': 'Music',
  '15': 'Pets & Animals',
  '17': 'Sports',
  '19': 'Travel',
  '20': 'Gaming',
  '22': 'People & Blogs',
  '23': 'Comedy',
  '24': 'Entertainment',
  '25': 'News',
  '26': 'How-to & Style',
  '27': 'Education',
  '28': 'Science & Technology',
};

const DISCOVERY_CATEGORIES = [
  {
    id: 'category-music',
    label: 'Music',
    categoryId: '10',
  },
  {
    id: 'category-gaming',
    label: 'Gaming',
    categoryId: '20',
  },
  {
    id: 'category-sports',
    label: 'Sports',
    categoryId: '17',
  },
  {
    id: 'category-entertainment',
    label: 'Entertainment',
    categoryId: '24',
  },
  {
    id: 'category-news',
    label: 'News',
    categoryId: '25',
  },
  {
    id: 'category-education',
    label: 'Education',
    categoryId: '27',
  },
] as const;

const GENERIC_TITLE_WORDS = new Set([
  'a',
  'an',
  'and',
  'the',
  'of',
  'to',
  'for',
  'with',
  'official',
  'video',
  'videos',
  'lyrics',
  'lyrical',
  'full',
  'song',
  'hd',
  '4k',
  'teaser',
  'trailer',
  'episode',
  'ep',
  'feat',
  'ft',
]);

const getCleanWords = (value: string): string[] => {
  return value
    .replace(/\([^)]*\)|\[[^\]]*\]/g, ' ')
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}&']/gu, ''))
    .filter(
      (word) =>
        word.length > 0 && !GENERIC_TITLE_WORDS.has(word.toLocaleLowerCase()),
    );
};

const cleanTitlePart = (value: string): string => {
  return getCleanWords(value).slice(0, 6).join(' ');
};

const extractTitleTopics = (title: string): string[] => {
  const titleParts = title
    .split(/\s*(?:\||•|–|—|:)\s*/)
    .map(cleanTitlePart)
    .filter(Boolean);

  const orderedTitleParts =
    titleParts.length > 1
      ? [titleParts[1], titleParts[0], ...titleParts.slice(2)]
      : titleParts;

  const fallbackTopic = cleanTitlePart(title);

  return Array.from(new Set([...orderedTitleParts, fallbackTopic]))
    .filter(Boolean)
    .slice(0, 2);
};

export const getPrimaryRecommendationQuery = (
  video: Video | null | undefined,
): string => {
  if (!video) {
    return '';
  }

  return extractTitleTopics(video.title)[0] ?? video.title;
};

export const createRecommendationFilters = (
  video: Video | null | undefined,
): RecommendationFilter[] => {
  if (!video) {
    return [];
  }

  const filters: RecommendationFilter[] = [
    {
      id: 'all',
      label: 'All',
      kind: 'mixed',
    },
  ];

  const channelTitle = video.channelTitle.trim();

  if (channelTitle) {
    filters.push({
      id: 'channel',
      label: `From ${channelTitle}`,
      kind: 'search',
      query: channelTitle,
    });
  }

  const titleTopics = extractTitleTopics(video.title);

  titleTopics.forEach((topic, index) => {
    filters.push({
      id: `topic-${index}`,
      label: topic,
      kind: 'search',
      query: topic,
    });
  });

  const currentCategoryLabel = CATEGORY_LABELS[video.category];

  if (currentCategoryLabel) {
    filters.push({
      id: `category-${video.category}`,
      label: currentCategoryLabel,
      kind: 'category',
      categoryId: video.category,
    });
  }

  DISCOVERY_CATEGORIES.forEach((category) => {
    if (category.categoryId === video.category) {
      return;
    }

    filters.push({
      id: category.id,
      label: category.label,
      kind: 'category',
      categoryId: category.categoryId,
    });
  });

  filters.push({
    id: 'trending',
    label: 'Trending',
    kind: 'trending',
  });

  return filters;
};

const getComparableTitleWords = (title: string): string[] => {
  return getCleanWords(title)
    .map((word) => word.toLocaleLowerCase())
    .slice(0, 4);
};

const hasVerySimilarTitle = (
  currentVideo: Video,
  candidateVideo: Video,
): boolean => {
  const currentTitleWords = getComparableTitleWords(currentVideo.title);

  if (currentTitleWords.length < 2) {
    return false;
  }

  const candidateTitleWords = new Set(
    getComparableTitleWords(candidateVideo.title),
  );

  const matchingWords = currentTitleWords.filter((word) =>
    candidateTitleWords.has(word),
  ).length;

  const requiredMatches = Math.min(3, currentTitleWords.length);

  return matchingWords >= requiredMatches;
};

export const getUniqueRecommendationVideos = (
  videos: readonly Video[],
  currentVideoId: string,
  limit = MAX_RECOMMENDATIONS,
): Video[] => {
  const selectedVideos: Video[] = [];
  const usedVideoIds = new Set([currentVideoId]);

  for (const video of videos) {
    if (usedVideoIds.has(video.id)) {
      continue;
    }

    usedVideoIds.add(video.id);
    selectedVideos.push(video);

    if (selectedVideos.length >= limit) {
      break;
    }
  }

  return selectedVideos;
};

export const mixRecommendationVideos = (
  currentVideo: Video,
  videoGroups: readonly (readonly Video[])[],
  limit = MAX_RECOMMENDATIONS,
): Video[] => {
  const mixedVideos: Video[] = [];
  const usedVideoIds = new Set([currentVideo.id]);

  const groupPositions = videoGroups.map(() => 0);

  let similarTitleVideosCount = 0;

  while (
    mixedVideos.length < limit &&
    groupPositions.some(
      (position, index) => position < videoGroups[index].length,
    )
  ) {
    videoGroups.forEach((videoGroup, groupIndex) => {
      while (
        groupPositions[groupIndex] < videoGroup.length &&
        mixedVideos.length < limit
      ) {
        const video = videoGroup[groupPositions[groupIndex]];

        groupPositions[groupIndex] += 1;

        if (usedVideoIds.has(video.id)) {
          continue;
        }

        usedVideoIds.add(video.id);

        const isVerySimilar = hasVerySimilarTitle(currentVideo, video);

        if (
          isVerySimilar &&
          similarTitleVideosCount >= MAX_SIMILAR_TITLE_VIDEOS
        ) {
          continue;
        }

        if (isVerySimilar) {
          similarTitleVideosCount += 1;
        }

        mixedVideos.push(video);

        break;
      }
    });
  }

  return mixedVideos;
};
