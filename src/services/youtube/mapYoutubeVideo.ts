import type { Video } from '../../utils/types';

import { formatYoutubeDuration } from './youtubeDuration';

import type { YouTubeVideoItem } from './types';

export const mapYoutubeVideo = (item: YouTubeVideoItem): Video => {
  const thumbnail =
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

    duration: formatYoutubeDuration(item.contentDetails.duration),

    category: item.snippet.categoryId,
  };
};
