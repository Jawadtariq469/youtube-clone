import { youtubeApi } from '../../config';

import { mapYoutubeVideo } from './mapYoutubeVideo';

import { getYoutubeDurationInSeconds } from './youtubeDuration';

import type { VideoPage } from '../../utils/types';

import type {
  YouTubeSearchResponse,
  YouTubeVideoItem,
  YouTubeVideosResponse,
} from './types';

const MAX_RESULTS = 25;

const MAX_SHORT_DURATION_SECONDS = 3 * 60;

export const getShortVideosPage = async (
  pageToken = '',
): Promise<VideoPage> => {
  const searchResponse = await youtubeApi.get<YouTubeSearchResponse>(
    '/search',
    {
      params: {
        part: 'snippet',

        q: '#shorts',
        type: 'video',

        maxResults: MAX_RESULTS,

        regionCode: import.meta.env.VITE_YOUTUBE_REGION_CODE,

        order: 'relevance',
        safeSearch: 'moderate',

        /*
         * The API's "short" filter means
         * less than four minutes.
         */
        videoDuration: 'short',

        videoEmbeddable: 'true',
        videoSyndicated: 'true',

        pageToken: pageToken || undefined,
      },
    },
  );

  const nextPageToken = searchResponse.data.nextPageToken;

  const videoIds = searchResponse.data.items
    .map((searchItem) => searchItem.id.videoId)
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
    videosResponse.data.items.map((videoItem) => [videoItem.id, videoItem]),
  );

  const shortVideos = videoIds
    .map((videoId) => videosById.get(videoId))
    .filter((videoItem): videoItem is YouTubeVideoItem => Boolean(videoItem))
    .filter((videoItem) => {
      const durationInSeconds = getYoutubeDurationInSeconds(
        videoItem.contentDetails.duration,
      );

      return (
        durationInSeconds > 0 && durationInSeconds <= MAX_SHORT_DURATION_SECONDS
      );
    })
    .map(mapYoutubeVideo);

  return {
    videos: shortVideos,

    ...(nextPageToken
      ? {
          nextPageToken,
        }
      : {}),
  };
};
