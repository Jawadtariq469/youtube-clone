import { youtubeApi } from '../../config';

import type { Video } from '../../utils/types';
import type { YouTubeChannelAvatarsResponse } from './types';

const CHANNELS_PER_REQUEST = 50;

const channelAvatarUrlCache = new Map<string, string>();

const createGroups = <T>(items: readonly T[], groupSize: number): T[][] => {
  const groups: T[][] = [];

  for (let startIndex = 0; startIndex < items.length; startIndex += groupSize) {
    groups.push(items.slice(startIndex, startIndex + groupSize));
  }

  return groups;
};

export const normalizeYoutubeImageUrl = (imageUrl: string): string => {
  const normalizedImageUrl = imageUrl.trim();

  if (normalizedImageUrl.startsWith('//')) {
    return `https:${normalizedImageUrl}`;
  }

  return normalizedImageUrl.replace(/^http:\/\//i, 'https://');
};

export const getChannelAvatarUrls = async (
  channelIds: readonly string[],
  signal?: AbortSignal,
): Promise<Map<string, string>> => {
  const uniqueChannelIds = Array.from(
    new Set(channelIds.map((channelId) => channelId.trim()).filter(Boolean)),
  );

  if (uniqueChannelIds.length === 0) {
    return new Map();
  }

  const uncachedChannelIds = uniqueChannelIds.filter(
    (channelId) => !channelAvatarUrlCache.has(channelId),
  );

  const channelGroups = createGroups(uncachedChannelIds, CHANNELS_PER_REQUEST);

  const responses = await Promise.all(
    channelGroups.map((channelGroup) =>
      youtubeApi.get<YouTubeChannelAvatarsResponse>('/channels', {
        params: {
          part: 'snippet',
          id: channelGroup.join(','),
          maxResults: CHANNELS_PER_REQUEST,
        },

        signal,
      }),
    ),
  );

  responses.forEach((response) => {
    response.data.items.forEach((channel) => {
      const thumbnail =
        channel.snippet.thumbnails.default ??
        channel.snippet.thumbnails.medium ??
        channel.snippet.thumbnails.high;

      channelAvatarUrlCache.set(
        channel.id,
        normalizeYoutubeImageUrl(thumbnail.url),
      );
    });
  });

  const channelAvatarUrls = new Map<string, string>();

  uniqueChannelIds.forEach((channelId) => {
    const channelAvatarUrl = channelAvatarUrlCache.get(channelId);

    if (channelAvatarUrl) {
      channelAvatarUrls.set(channelId, channelAvatarUrl);
    }
  });

  return channelAvatarUrls;
};

export const addChannelAvatarsToVideos = async <T extends Video>(
  videos: readonly T[],
  signal?: AbortSignal,
): Promise<T[]> => {
  if (videos.length === 0) {
    return [];
  }

  try {
    const channelAvatarUrls = await getChannelAvatarUrls(
      videos.map((video) => video.channelId),
      signal,
    );

    return videos.map((video) => {
      const channelAvatarUrl = channelAvatarUrls.get(video.channelId);

      if (!channelAvatarUrl) {
        return video;
      }

      return {
        ...video,
        channelAvatarUrl,
      };
    });
  } catch {
    /*
     * Videos should remain usable if the additional
     * channel-logo request fails.
     */
    return Array.from(videos);
  }
};
