import { youtubeApi } from '../../config';

import type { ChannelDetails } from '../../utils/types';
import type { YouTubeChannelsResponse } from './types';

export const getChannelById = async (
  channelId: string,
): Promise<ChannelDetails | null> => {
  const normalizedChannelId = channelId.trim();

  if (!normalizedChannelId) {
    return null;
  }

  const response = await youtubeApi.get<YouTubeChannelsResponse>('/channels', {
    params: {
      part: [
        'snippet',
        'contentDetails',
        'statistics',
        'brandingSettings',
      ].join(','),

      id: normalizedChannelId,
      maxResults: 1,
    },
  });

  const channel = response.data.items[0];

  if (!channel) {
    return null;
  }

  const thumbnail =
    channel.snippet.thumbnails.high ??
    channel.snippet.thumbnails.medium ??
    channel.snippet.thumbnails.default;

  const uploadsPlaylistId =
    channel.contentDetails.relatedPlaylists.uploads ?? '';

  const subscriberCount = channel.statistics.hiddenSubscriberCount
    ? undefined
    : Number(channel.statistics.subscriberCount ?? 0);

  const bannerUrl =
    channel.brandingSettings?.image?.bannerExternalUrl ??
    channel.brandingSettings?.image?.bannerImageUrl;

  return {
    channelId: channel.id,
    channelTitle: channel.snippet.title,
    channelAvatarUrl: thumbnail.url,

    description: channel.snippet.description,
    publishedAt: channel.snippet.publishedAt,

    videoCount: Number(channel.statistics.videoCount ?? 0),

    viewCount: Number(channel.statistics.viewCount ?? 0),

    uploadsPlaylistId,

    ...(channel.snippet.customUrl
      ? {
          customUrl: channel.snippet.customUrl,
        }
      : {}),

    ...(subscriberCount !== undefined
      ? {
          subscriberCount,
        }
      : {}),

    ...(bannerUrl
      ? {
          bannerUrl,
        }
      : {}),
  };
};
