import type { Video } from '../../utils/types';
import type { YouTubeVideoItem } from './types';

const formatDuration = (duration: string): string => {
  const durationPattern = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

  const match = duration.match(durationPattern);

  if (!match) {
    return '0:00';
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);

  const formattedSeconds = String(seconds).padStart(2, '0');

  if (hours > 0) {
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${minutes}:${formattedSeconds}`;
};

export const mapYoutubeVideo = (item: YouTubeVideoItem): Video => {
  const thumbnail =
    item.snippet.thumbnails.maxres ??
    item.snippet.thumbnails.standard ??
    item.snippet.thumbnails.high ??
    item.snippet.thumbnails.medium ??
    item.snippet.thumbnails.default;

  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: thumbnail.url,
    channelTitle: item.snippet.channelTitle,
    viewCount: Number(item.statistics.viewCount ?? 0),
    publishedAt: item.snippet.publishedAt,
    duration: formatDuration(item.contentDetails.duration),
    category: item.snippet.categoryId,
  };
};
