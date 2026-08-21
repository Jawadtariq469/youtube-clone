import { useCallback, useState } from 'react';
import { isAxiosError } from 'axios';

import { Comments } from '../../components/ui';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useVideoComments } from '../../hooks/useVideoComments';
import { useAuth } from '../../store/auth';

import {
  DesktopCommentsInfiniteScrollSentinel,
  DesktopCommentsLoadingStatus,
} from './watchView.styles';

import type { YouTubeApiErrorResponse } from '../../services/youtube/types';
import type { VideoComment } from '../../utils/types';
import type { WatchCommentsProps } from './types';

type LocalCommentsByVideoId = Record<string, VideoComment[]>;

const EMPTY_LOCAL_COMMENTS: readonly VideoComment[] = [];

const isCommentsDisabledError = (error: unknown): boolean => {
  if (!isAxiosError<YouTubeApiErrorResponse>(error)) {
    return false;
  }

  return (
    error.response?.data.error?.errors?.some(
      (apiError) => apiError.reason === 'commentsDisabled',
    ) ?? false
  );
};

const createLocalCommentId = (): string => {
  return `local-comment-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const WatchComments = ({ videoId }: WatchCommentsProps) => {
  const [localCommentsByVideoId, setLocalCommentsByVideoId] =
    useState<LocalCommentsByVideoId>({});

  const { user, isLoading: isAuthLoading, signInWithGoogle } = useAuth();

  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useVideoComments(videoId);

  const apiComments = data?.pages.flatMap((page) => page.comments) ?? [];

  const localComments = localCommentsByVideoId[videoId] ?? EMPTY_LOCAL_COMMENTS;

  const comments = [...localComments, ...apiComments];

  const apiTotalComments = data?.pages[0]?.totalResults ?? 0;

  const totalComments = apiTotalComments + localComments.length;

  const commentsDisabled = isCommentsDisabledError(error);

  const handleSignIn = (): void => {
    void signInWithGoogle();
  };

  const handleCommentSubmit = (commentText: string): void => {
    if (!user) {
      return;
    }

    const newComment: VideoComment = {
      id: createLocalCommentId(),

      authorName: user.name,
      authorAvatarUrl: user.avatarUrl ?? '',

      text: commentText,

      likeCount: 0,
      replyCount: 0,

      publishedAt: new Date().toISOString(),
    };

    setLocalCommentsByVideoId((currentCommentsByVideoId) => {
      const currentVideoComments = currentCommentsByVideoId[videoId] ?? [];

      return {
        ...currentCommentsByVideoId,

        [videoId]: [newComment, ...currentVideoComments],
      };
    });
  };

  const handleLoadMore = useCallback((): void => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    void fetchNextPage({
      cancelRefetch: false,
    });
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const hasMoreComments = Boolean(hasNextPage) && !commentsDisabled && !isError;

  const infiniteScrollResetKey = `${videoId}-${data?.pages.length ?? 0}`;

  const commentsInfiniteScrollRef = useInfiniteScroll({
    hasNextPage: hasMoreComments,
    isFetchingNextPage,
    onLoadMore: handleLoadMore,
    resetKey: infiniteScrollResetKey,
  });

  return (
    <>
      <Comments
        comments={comments}
        totalComments={totalComments}
        currentUser={user}
        isAuthLoading={isAuthLoading}
        isLoading={isPending}
        isError={isError && !commentsDisabled}
        isCommentsDisabled={commentsDisabled}
        hasMoreComments={hasMoreComments}
        isLoadingMore={isFetchingNextPage}
        onSignIn={handleSignIn}
        onCommentSubmit={handleCommentSubmit}
        onLoadMore={handleLoadMore}
      />

      {hasMoreComments && (
        <DesktopCommentsInfiniteScrollSentinel
          ref={commentsInfiniteScrollRef}
          aria-hidden="true"
        />
      )}

      {isFetchingNextPage && (
        <DesktopCommentsLoadingStatus role="status">
          Loading more comments...
        </DesktopCommentsLoadingStatus>
      )}
    </>
  );
};

export default WatchComments;
