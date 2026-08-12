import { useInfiniteQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { getVideoComments } from '../services/youtube/getVideoComments';

const VIDEO_COMMENTS_QUERY_KEY = ['youtube', 'video-comments'] as const;

const shouldRetryCommentsRequest = (
  failureCount: number,
  error: unknown,
): boolean => {
  if (isAxiosError(error)) {
    const responseStatus = error.response?.status;

    if (responseStatus === 403 || responseStatus === 404) {
      return false;
    }
  }

  return failureCount < 2;
};

export const useVideoComments = (videoId: string) => {
  return useInfiniteQuery({
    queryKey: [...VIDEO_COMMENTS_QUERY_KEY, videoId],

    queryFn: ({ pageParam }) => getVideoComments(videoId, pageParam),

    initialPageParam: '',

    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,

    enabled: videoId.length > 0,

    staleTime: 5 * 60 * 1000,

    retry: shouldRetryCommentsRequest,
  });
};
