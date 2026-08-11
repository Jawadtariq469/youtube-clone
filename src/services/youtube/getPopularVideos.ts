import { youtubeApi } from '../../config';
import { mapYoutubeVideo } from './mapYoutubeVideo';

import type { Video } from '../../utils/types';
import type { YouTubeVideosResponse } from './types';

const DEFAULT_CATEGORY_ID = '0';
const MAX_RESULTS = 24;

export const getPopularVideos = async (
  categoryId = DEFAULT_CATEGORY_ID,
): Promise<Video[]> => {
  const response = await youtubeApi.get<YouTubeVideosResponse>('/videos', {
    params: {
      part: 'snippet,contentDetails,statistics',
      chart: 'mostPopular',
      maxResults: MAX_RESULTS,
      regionCode: import.meta.env.VITE_YOUTUBE_REGION_CODE,
      videoCategoryId: categoryId,
    },
  });

  return response.data.items.map(mapYoutubeVideo);
};
