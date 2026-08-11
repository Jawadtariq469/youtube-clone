import { youtubeApi } from '../../config/youtubeApi';
import type { Video } from '../../utils/types/video';
import { mapYoutubeVideo } from './mapYoutubeVideo';
import type {
  YouTubeSearchResponse,
  YouTubeVideoItem,
  YouTubeVideosResponse,
} from './types';

const MAX_RESULTS = 24;

export const searchVideos = async (query: string): Promise<Video[]> => {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const searchResponse = await youtubeApi.get<YouTubeSearchResponse>(
    '/search',
    {
      params: {
        part: 'snippet',
        q: normalizedQuery,
        type: 'video',
        maxResults: MAX_RESULTS,
        regionCode: 'PK',
        order: 'relevance',
        safeSearch: 'moderate',

        videoEmbeddable: 'true',
        videoSyndicated: 'true',
      },
    },
  );

  const videoIds = searchResponse.data.items
    .map((item) => item.id.videoId)
    .filter((videoId): videoId is string => Boolean(videoId));

  if (videoIds.length === 0) {
    return [];
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

  return videoIds
    .map((videoId) => videosById.get(videoId))
    .filter((video): video is YouTubeVideoItem => Boolean(video))
    .map(mapYoutubeVideo);
};
