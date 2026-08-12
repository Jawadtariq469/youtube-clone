import type { VideoComment, VideoCommentReply } from '../../../utils/types';

export interface CommentComposerUser {
  name: string;
  avatarUrl: string | null;
}

export interface CommentComposerProps {
  user: CommentComposerUser | null;

  isAuthLoading?: boolean;

  onSignIn: () => void;
  onSubmit: (commentText: string) => void;
}

export interface CommentsProps {
  comments: readonly VideoComment[];
  totalComments: number;

  currentUser: CommentComposerUser | null;

  isAuthLoading?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isCommentsDisabled?: boolean;

  hasMoreComments?: boolean;
  isLoadingMore?: boolean;

  onSignIn: () => void;
  onCommentSubmit: (commentText: string) => void;
  onLoadMore: () => void;
}

export type CommentEntryData = VideoComment | VideoCommentReply;

export type CommentEntryVariant = 'comment' | 'reply';

export interface CommentEntryProps {
  entry: CommentEntryData;
  variant?: CommentEntryVariant;
}

export interface CommentThreadProps {
  comment: VideoComment;
}

export interface CommentRepliesProps {
  parentCommentId: string;
}
