import { useInfiniteQuery } from '@tanstack/react-query';

import { getCommentReplies } from '../services/youtube/getCommentReplies';

const COMMENT_REPLIES_QUERY_KEY = ['youtube', 'comment-replies'] as const;

export const useCommentReplies = (parentCommentId: string) => {
  return useInfiniteQuery({
    queryKey: [...COMMENT_REPLIES_QUERY_KEY, parentCommentId],

    queryFn: ({ pageParam }) => getCommentReplies(parentCommentId, pageParam),

    initialPageParam: '',

    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,

    enabled: parentCommentId.length > 0,

    staleTime: 5 * 60 * 1000,

    retry: 1,
  });
};
