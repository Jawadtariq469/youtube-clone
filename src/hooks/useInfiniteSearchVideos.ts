import { useInfiniteQuery } from '@tanstack/react-query';

import { searchVideosPage } from '../services/youtube/searchVideos';

const INFINITE_SEARCH_VIDEOS_QUERY_KEY = [
  'youtube',
  'search',
  'infinite',
] as const;

const INITIAL_PAGE_TOKEN = '';

export const useInfiniteSearchVideos = (searchQuery: string) => {
  const normalizedQuery = searchQuery.trim();

  return useInfiniteQuery({
    queryKey: [...INFINITE_SEARCH_VIDEOS_QUERY_KEY, normalizedQuery],

    queryFn: ({ pageParam }) => searchVideosPage(normalizedQuery, pageParam),

    initialPageParam: INITIAL_PAGE_TOKEN,

    getNextPageParam: (lastPage) => lastPage.nextPageToken,

    enabled: normalizedQuery.length > 0,
  });
};
