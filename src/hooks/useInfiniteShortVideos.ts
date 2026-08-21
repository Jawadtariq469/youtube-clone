import { useInfiniteQuery } from '@tanstack/react-query';

import { getShortVideosPage } from '../services/youtube/getShortVideos';

const SHORT_VIDEOS_QUERY_KEY = ['youtube', 'short-videos', 'infinite'] as const;

const INITIAL_PAGE_TOKEN = '';

const FIFTEEN_MINUTES = 15 * 60 * 1_000;

export const useInfiniteShortVideos = () => {
  return useInfiniteQuery({
    queryKey: SHORT_VIDEOS_QUERY_KEY,

    queryFn: ({ pageParam }) => getShortVideosPage(pageParam),

    initialPageParam: INITIAL_PAGE_TOKEN,

    getNextPageParam: (lastPage) => lastPage.nextPageToken,

    /*
     * Search requests consume more quota,
     * so avoid unnecessary refetching.
     */
    staleTime: FIFTEEN_MINUTES,

    /*
     * Keep previously fetched pages while the
     * application remains open. This allows the
     * Shorts page to restore the previous video.
     */
    gcTime: Infinity,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
