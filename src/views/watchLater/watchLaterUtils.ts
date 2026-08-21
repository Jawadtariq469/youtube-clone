import type { WatchLaterVideo } from '../../utils/types';

import type { WatchLaterFilterId, WatchLaterSortId } from './types';

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

const getSavedTime = (savedAt: string): number => {
  const savedTime = Date.parse(savedAt);

  return Number.isNaN(savedTime) ? 0 : savedTime;
};

export const isWatchLaterShort = (
  watchLaterVideo: WatchLaterVideo,
): boolean => {
  const durationInSeconds = getDurationInSeconds(watchLaterVideo.duration);

  const searchableText = [
    watchLaterVideo.title,
    watchLaterVideo.description ?? '',
  ]
    .join(' ')
    .toLowerCase();

  return (
    (durationInSeconds !== null &&
      durationInSeconds <= SHORT_VIDEO_MAXIMUM_SECONDS) ||
    searchableText.includes('#shorts') ||
    searchableText.includes('youtube shorts')
  );
};

export const filterWatchLaterVideos = (
  watchLaterVideos: readonly WatchLaterVideo[],
  selectedFilter: WatchLaterFilterId,
): WatchLaterVideo[] => {
  switch (selectedFilter) {
    case 'shorts':
      return watchLaterVideos.filter(isWatchLaterShort);

    case 'videos':
      return watchLaterVideos.filter(
        (watchLaterVideo) => !isWatchLaterShort(watchLaterVideo),
      );

    case 'all':
    default:
      return [...watchLaterVideos];
  }
};

export const sortWatchLaterVideos = (
  watchLaterVideos: readonly WatchLaterVideo[],
  selectedSort: WatchLaterSortId,
): WatchLaterVideo[] => {
  const sortedVideos = [...watchLaterVideos];

  if (selectedSort === 'newest') {
    return sortedVideos.sort(
      (firstVideo, secondVideo) =>
        getSavedTime(secondVideo.savedAt) - getSavedTime(firstVideo.savedAt),
    );
  }

  if (selectedSort === 'oldest') {
    return sortedVideos.sort(
      (firstVideo, secondVideo) =>
        getSavedTime(firstVideo.savedAt) - getSavedTime(secondVideo.savedAt),
    );
  }

  return sortedVideos;
};

export const formatWatchLaterUpdatedDate = (
  savedAt: string | undefined,
): string => {
  if (!savedAt) {
    return 'Updated recently';
  }

  const savedDate = new Date(savedAt);

  if (Number.isNaN(savedDate.getTime())) {
    return 'Updated recently';
  }

  const today = new Date();

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const startOfSavedDate = new Date(
    savedDate.getFullYear(),
    savedDate.getMonth(),
    savedDate.getDate(),
  );

  const dayDifference = Math.round(
    (startOfToday.getTime() - startOfSavedDate.getTime()) /
      (24 * 60 * 60 * 1000),
  );

  if (dayDifference === 0) {
    return 'Updated today';
  }

  if (dayDifference === 1) {
    return 'Updated yesterday';
  }

  return `Updated on ${new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(savedDate)}`;
};
