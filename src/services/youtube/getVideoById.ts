import { youtubeApi } from '../../config/youtubeApi';

import { mapYoutubeVideos } from './mapYoutubeVideo';

import type { Video } from '../../utils/types';
import type { YouTubeVideosResponse } from './types';

export const getVideoById = async (
  videoId: string,
  signal?: AbortSignal,
): Promise<Video | null> => {
  const normalizedVideoId = videoId.trim();

  if (!normalizedVideoId) {
    return null;
  }

  const response = await youtubeApi.get<YouTubeVideosResponse>('/videos', {
    params: {
      part: 'snippet,contentDetails,statistics',
      id: normalizedVideoId,
    },

    signal,
  });

  const videoItem = response.data.items[0];

  if (!videoItem) {
    return null;
  }

  const [video] = await mapYoutubeVideos([videoItem], signal);

  return video ?? null;
};
