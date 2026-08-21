import type { LikedVideo } from '../../utils/types';

import type { LikedVideosFilterId } from './types';

const SHORT_VIDEO_MAXIMUM_SECONDS = 60;

const getDurationInSeconds = (duration?: string): number | null => {
  if (!duration) {
    return null;
  }

  const durationParts = duration.split(':').map(Number);

  if (
    durationParts.length < 2 ||
    durationParts.length > 3 ||
    durationParts.some((durationPart) => !Number.isFinite(durationPart))
  ) {
    return null;
  }

  return durationParts.reduce(
    (totalSeconds, durationPart) => totalSeconds * 60 + durationPart,
    0,
  );
};

export const isLikedShort = (likedVideo: LikedVideo): boolean => {
  const durationInSeconds = getDurationInSeconds(likedVideo.duration);

  const searchableText = [likedVideo.title, likedVideo.description ?? '']
    .join(' ')
    .toLowerCase();

  return (
    (durationInSeconds !== null &&
      durationInSeconds <= SHORT_VIDEO_MAXIMUM_SECONDS) ||
    searchableText.includes('#shorts') ||
    searchableText.includes('youtube shorts')
  );
};

export const filterLikedVideos = (
  likedVideos: readonly LikedVideo[],
  selectedFilter: LikedVideosFilterId,
): LikedVideo[] => {
  switch (selectedFilter) {
    case 'shorts':
      return likedVideos.filter(isLikedShort);

    case 'videos':
      return likedVideos.filter((likedVideo) => !isLikedShort(likedVideo));

    case 'all':
    default:
      return [...likedVideos];
  }
};

export const formatLikedVideosUpdatedDate = (
  likedAt: string | undefined,
): string => {
  if (!likedAt) {
    return 'Updated recently';
  }

  const likedDate = new Date(likedAt);

  if (Number.isNaN(likedDate.getTime())) {
    return 'Updated recently';
  }

  return `Updated on ${new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(likedDate)}`;
};
