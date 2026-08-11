import { isAxiosError } from 'axios';

import { youtubeApi } from '../../config';

import { mapYoutubeVideo } from './mapYoutubeVideo';
import { searchVideos } from './searchVideos';

import type { Video } from '../../utils/types';
import type { YouTubeVideosResponse } from './types';

const DEFAULT_CATEGORY_ID = '0';
const MAX_RESULTS = 24;

const CATEGORY_SEARCH_QUERIES: Record<string, string> = {
  '1': 'film and animation',
  '2': 'autos and vehicles',
  '10': 'music videos',
  '15': 'pets and animals',
  '17': 'sports',
  '19': 'travel and events',
  '20': 'gaming',
  '22': 'people and blogs',
  '23': 'comedy',
  '24': 'entertainment',
  '25': 'news and politics',
  '26': 'how to and style',
  '27': 'education tutorials',
  '28': 'science and technology',
};

const isUnavailableChartError = (error: unknown): boolean => {
  if (!isAxiosError(error)) {
    return false;
  }

  const responseStatus = error.response?.status;

  return responseStatus === 400 || responseStatus === 404;
};

export const getPopularVideos = async (
  categoryId = DEFAULT_CATEGORY_ID,
): Promise<Video[]> => {
  try {
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
  } catch (error: unknown) {
    const categorySearchQuery = CATEGORY_SEARCH_QUERIES[categoryId];

    const canUseSearchFallback =
      categoryId !== DEFAULT_CATEGORY_ID &&
      Boolean(categorySearchQuery) &&
      isUnavailableChartError(error);

    if (!canUseSearchFallback) {
      throw error;
    }

    return searchVideos(categorySearchQuery);
  }
};
