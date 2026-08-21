import { youtubeApi } from '../../config';

import { mapYoutubeVideos } from './mapYoutubeVideo';

import type { Video } from '../../utils/types';

import type {
  YouTubeChannelsResponse,
  YouTubePlaylistItemsResponse,
  YouTubeVideosResponse,
} from './types';

const CHANNELS_PER_REQUEST = 50;
const VIDEOS_PER_CHANNEL = 6;
const VIDEOS_PER_DETAILS_REQUEST = 50;
const MAX_FEED_VIDEOS = 60;

const createGroups = <T>(items: readonly T[], groupSize: number): T[][] => {
  const groups: T[][] = [];

  for (let startIndex = 0; startIndex < items.length; startIndex += groupSize) {
    groups.push(items.slice(startIndex, startIndex + groupSize));
  }

  return groups;
};

export const getSubscriptionVideos = async (
  channelIds: readonly string[],
): Promise<Video[]> => {
  const uniqueChannelIds = Array.from(
    new Set(channelIds.map((channelId) => channelId.trim()).filter(Boolean)),
  );

  if (uniqueChannelIds.length === 0) {
    return [];
  }

  const channelGroups = createGroups(uniqueChannelIds, CHANNELS_PER_REQUEST);

  const channelResponses = await Promise.all(
    channelGroups.map(async (channelGroup) => {
      const response = await youtubeApi.get<YouTubeChannelsResponse>(
        '/channels',
        {
          params: {
            part: 'contentDetails',
            id: channelGroup.join(','),
            maxResults: CHANNELS_PER_REQUEST,
          },
        },
      );

      return response.data.items;
    }),
  );

  const uploadsPlaylistIds = channelResponses
    .flat()
    .map((channel) => channel.contentDetails.relatedPlaylists.uploads)
    .filter((playlistId): playlistId is string => Boolean(playlistId));

  const playlistResponses = await Promise.all(
    uploadsPlaylistIds.map(async (playlistId) => {
      const response = await youtubeApi.get<YouTubePlaylistItemsResponse>(
        '/playlistItems',
        {
          params: {
            part: 'contentDetails',
            playlistId,
            maxResults: VIDEOS_PER_CHANNEL,
          },
        },
      );

      return response.data.items;
    }),
  );

  const videoIds = Array.from(
    new Set(
      playlistResponses
        .flat()
        .map((playlistItem) => playlistItem.contentDetails.videoId)
        .filter((videoId): videoId is string => Boolean(videoId)),
    ),
  );

  if (videoIds.length === 0) {
    return [];
  }

  const videoIdGroups = createGroups(videoIds, VIDEOS_PER_DETAILS_REQUEST);

  const videoResponses = await Promise.all(
    videoIdGroups.map(async (videoIdGroup) => {
      const response = await youtubeApi.get<YouTubeVideosResponse>('/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',

          id: videoIdGroup.join(','),
        },
      });

      return response.data.items;
    }),
  );

  const videos = await mapYoutubeVideos(videoResponses.flat());

  return videos
    .sort((firstVideo, secondVideo) => {
      const firstPublishedTime = Date.parse(firstVideo.publishedAt) || 0;

      const secondPublishedTime = Date.parse(secondVideo.publishedAt) || 0;

      return secondPublishedTime - firstPublishedTime;
    })
    .slice(0, MAX_FEED_VIDEOS);
};
