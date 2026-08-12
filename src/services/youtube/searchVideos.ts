import { youtubeApi } from '../../config';

import { mapYoutubeVideo } from './mapYoutubeVideo';

import type { Video, VideoPage } from '../../utils/types';
import type {
  YouTubeSearchResponse,
  YouTubeVideoItem,
  YouTubeVideosResponse,
} from './types';

const MAX_RESULTS = 24;

export const searchVideosPage = async (
  query: string,
  pageToken = '',
): Promise<VideoPage> => {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return {
      videos: [],
    };
  }

  const searchResponse = await youtubeApi.get<YouTubeSearchResponse>(
    '/search',
    {
      params: {
        part: 'snippet',
        q: normalizedQuery,
        type: 'video',
        maxResults: MAX_RESULTS,

        regionCode: import.meta.env.VITE_YOUTUBE_REGION_CODE,

        order: 'relevance',
        safeSearch: 'moderate',

        videoEmbeddable: 'true',
        videoSyndicated: 'true',

        pageToken: pageToken || undefined,
      },
    },
  );

  const nextPageToken = searchResponse.data.nextPageToken;

  const videoIds = searchResponse.data.items
    .map((item) => item.id.videoId)
    .filter((videoId): videoId is string => Boolean(videoId));

  if (videoIds.length === 0) {
    return {
      videos: [],

      ...(nextPageToken
        ? {
            nextPageToken,
          }
        : {}),
    };
  }

  const videosResponse = await youtubeApi.get<YouTubeVideosResponse>(
    '/videos',
    {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoIds.join(','),
      },
    },
  );

  const videosById = new Map(
    videosResponse.data.items.map((video) => [video.id, video]),
  );

  const videos = videoIds
    .map((videoId) => videosById.get(videoId))
    .filter((video): video is YouTubeVideoItem => Boolean(video))
    .map(mapYoutubeVideo);

  return {
    videos,

    ...(nextPageToken
      ? {
          nextPageToken,
        }
      : {}),
  };
};

/**
 * Used by features that only require the first page,
 * such as watch-page recommendations.
 */
export const searchVideos = async (query: string): Promise<Video[]> => {
  const firstPage = await searchVideosPage(query);

  return firstPage.videos;
};
