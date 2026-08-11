import { useQuery } from '@tanstack/react-query';

import { getPopularVideos } from '../services/youtube/getPopularVideos';

const POPULAR_VIDEOS_QUERY_KEY = ['youtube', 'popular-videos'] as const;

export const usePopularVideos = (categoryId: string) => {
  return useQuery({
    queryKey: [...POPULAR_VIDEOS_QUERY_KEY, categoryId],

    queryFn: () => getPopularVideos(categoryId),

    enabled: Boolean(categoryId),
  });
};
