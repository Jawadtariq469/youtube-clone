export type VideoComment = {
  id: string;

  authorName: string;
  authorAvatarUrl: string;

  text: string;

  likeCount: number;
  replyCount: number;

  publishedAt: string;
};

export type VideoCommentReply = {
  id: string;

  authorName: string;
  authorAvatarUrl: string;

  text: string;

  likeCount: number;

  publishedAt: string;
};

export type VideoCommentsPage = {
  comments: VideoComment[];

  nextPageToken?: string;

  totalResults: number;
};

export type VideoCommentRepliesPage = {
  replies: VideoCommentReply[];

  nextPageToken?: string;

  totalResults: number;
};
