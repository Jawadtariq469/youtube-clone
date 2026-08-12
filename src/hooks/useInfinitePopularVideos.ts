import { useInfiniteQuery } from '@tanstack/react-query';

import { getPopularVideosPage } from '../services/youtube/getPopularVideos';

const INFINITE_POPULAR_VIDEOS_QUERY_KEY = [
  'youtube',
  'popular-videos',
  'infinite',
] as const;

const INITIAL_PAGE_TOKEN = '';

export const useInfinitePopularVideos = (categoryId: string) => {
  return useInfiniteQuery({
    queryKey: [...INFINITE_POPULAR_VIDEOS_QUERY_KEY, categoryId],

    queryFn: ({ pageParam }) => getPopularVideosPage(categoryId, pageParam),

    initialPageParam: INITIAL_PAGE_TOKEN,

    getNextPageParam: (lastPage) => lastPage.nextPageToken,

    enabled: Boolean(categoryId),
  });
};
