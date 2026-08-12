import { youtubeApi } from '../../config';

import type { VideoCommentsPage } from '../../utils/types';
import type { YouTubeCommentThreadsResponse } from './types';

const COMMENTS_PER_PAGE = 20;

export const getVideoComments = async (
  videoId: string,
  pageToken = '',
): Promise<VideoCommentsPage> => {
  const response = await youtubeApi.get<YouTubeCommentThreadsResponse>(
    '/commentThreads',
    {
      params: {
        part: 'snippet',
        videoId,
        maxResults: COMMENTS_PER_PAGE,
        order: 'relevance',
        textFormat: 'plainText',
        pageToken: pageToken || undefined,
      },
    },
  );

  const comments = response.data.items.map((item) => {
    const topLevelComment = item.snippet.topLevelComment;

    return {
      id: topLevelComment.id,

      authorName: topLevelComment.snippet.authorDisplayName,

      authorAvatarUrl: topLevelComment.snippet.authorProfileImageUrl,

      text: topLevelComment.snippet.textDisplay,

      likeCount: topLevelComment.snippet.likeCount,

      replyCount: item.snippet.totalReplyCount,

      publishedAt: topLevelComment.snippet.publishedAt,
    };
  });

  return {
    comments,
    nextPageToken: response.data.nextPageToken,
    totalResults: response.data.pageInfo.totalResults,
  };
};
