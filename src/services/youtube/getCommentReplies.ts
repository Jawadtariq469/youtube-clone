import { youtubeApi } from '../../config';

import type { VideoCommentRepliesPage } from '../../utils/types';
import type { YouTubeCommentsResponse } from './types';

const REPLIES_PER_PAGE = 20;

export const getCommentReplies = async (
  parentCommentId: string,
  pageToken = '',
): Promise<VideoCommentRepliesPage> => {
  const response = await youtubeApi.get<YouTubeCommentsResponse>('/comments', {
    params: {
      part: 'snippet',
      parentId: parentCommentId,
      maxResults: REPLIES_PER_PAGE,
      textFormat: 'plainText',
      pageToken: pageToken || undefined,
    },
  });

  const replies = response.data.items.map((item) => ({
    id: item.id,

    authorName: item.snippet.authorDisplayName,
    authorAvatarUrl: item.snippet.authorProfileImageUrl,

    text: item.snippet.textDisplay,

    likeCount: item.snippet.likeCount,

    publishedAt: item.snippet.publishedAt,
  }));

  return {
    replies,
    nextPageToken: response.data.nextPageToken,
    totalResults: response.data.pageInfo.totalResults,
  };
};
