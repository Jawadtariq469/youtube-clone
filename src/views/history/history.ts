import type { WatchHistoryItem } from '../../utils/types';
import type { HistoryDateGroup, HistoryFilterId } from './types';

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const SHORT_VIDEO_MAXIMUM_SECONDS = 60;
const MUSIC_CATEGORY_ID = '10';

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

const isShortVideo = (historyItem: WatchHistoryItem): boolean => {
  const durationInSeconds = getDurationInSeconds(historyItem.duration);

  return (
    durationInSeconds !== null &&
    durationInSeconds <= SHORT_VIDEO_MAXIMUM_SECONDS
  );
};

const isPodcast = (historyItem: WatchHistoryItem): boolean => {
  const searchableText = [
    historyItem.title,
    historyItem.channelTitle,
    historyItem.description ?? '',
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes('podcast');
};

const matchesHistoryFilter = (
  historyItem: WatchHistoryItem,
  selectedFilter: HistoryFilterId,
): boolean => {
  switch (selectedFilter) {
    case 'shorts':
      return isShortVideo(historyItem);

    case 'podcasts':
      return isPodcast(historyItem);

    case 'music':
      return historyItem.category === MUSIC_CATEGORY_ID;

    case 'videos':
      return !isShortVideo(historyItem);

    case 'all':
    default:
      return true;
  }
};

export const filterHistoryItems = (
  historyItems: WatchHistoryItem[],
  selectedFilter: HistoryFilterId,
  searchValue: string,
): WatchHistoryItem[] => {
  const normalizedSearchValue = searchValue.trim().toLowerCase();

  return historyItems.filter((historyItem) => {
    if (!matchesHistoryFilter(historyItem, selectedFilter)) {
      return false;
    }

    if (!normalizedSearchValue) {
      return true;
    }

    const searchableText = [
      historyItem.title,
      historyItem.channelTitle,
      historyItem.description ?? '',
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedSearchValue);
  });
};

const getLocalDateId = (date: Date): string => {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
};

const getLocalDayNumber = (date: Date): number => {
  return (
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) /
    MILLISECONDS_PER_DAY
  );
};

const formatHistoryDateLabel = (date: Date): string => {
  const currentDate = new Date();

  const daysAgo = getLocalDayNumber(currentDate) - getLocalDayNumber(date);

  if (daysAgo === 0) {
    return 'Today';
  }

  if (daysAgo === 1) {
    return 'Yesterday';
  }

  if (daysAgo > 1 && daysAgo < 7) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date);
  }

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
  };

  if (date.getFullYear() !== currentDate.getFullYear()) {
    dateFormatOptions.year = 'numeric';
  }

  return new Intl.DateTimeFormat('en-US', dateFormatOptions).format(date);
};

export const groupHistoryItemsByDate = (
  historyItems: WatchHistoryItem[],
): HistoryDateGroup[] => {
  const historyGroups = new Map<string, HistoryDateGroup>();

  historyItems.forEach((historyItem) => {
    const watchedDate = new Date(historyItem.watchedAt);

    const hasValidDate = !Number.isNaN(watchedDate.getTime());

    const groupId = hasValidDate ? getLocalDateId(watchedDate) : 'earlier';

    const existingGroup = historyGroups.get(groupId);

    if (existingGroup) {
      existingGroup.items.push(historyItem);

      return;
    }

    historyGroups.set(groupId, {
      id: groupId,
      label: hasValidDate ? formatHistoryDateLabel(watchedDate) : 'Earlier',
      items: [historyItem],
    });
  });

  return Array.from(historyGroups.values());
};
