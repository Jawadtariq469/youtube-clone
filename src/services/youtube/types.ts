export type YouTubeThumbnail = {
  url: string;
  width?: number;
  height?: number;
};

export type YouTubeThumbnails = {
  default: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high?: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
};

export type YouTubeVideoItem = {
  id: string;

  snippet: {
    title: string;

    channelId: string;
    channelTitle: string;

    description: string;
    publishedAt: string;
    categoryId: string;
    thumbnails: YouTubeThumbnails;
  };

  contentDetails: {
    duration: string;
  };

  statistics: {
    viewCount?: string;
  };
};

export type YouTubeVideosResponse = {
  nextPageToken?: string;

  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };

  items: YouTubeVideoItem[];
};
export type YouTubeSearchResponse = {
  nextPageToken?: string;

  items: Array<{
    id: {
      videoId?: string;
    };
  }>;
};
export type SearchSuggestionsResponse = [string, string[], ...unknown[]];
export type YouTubeCommentThreadItem = {
  id: string;

  snippet: {
    totalReplyCount: number;

    topLevelComment: {
      id: string;

      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;

        textDisplay: string;

        likeCount: number;

        publishedAt: string;
        updatedAt: string;
      };
    };
  };
};

export type YouTubeCommentThreadsResponse = {
  nextPageToken?: string;

  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };

  items: YouTubeCommentThreadItem[];
};
export type YouTubeApiErrorResponse = {
  error?: {
    code?: number;
    message?: string;

    errors?: Array<{
      reason?: string;
      message?: string;
    }>;
  };
};
export type YouTubeCommentItem = {
  id: string;

  snippet: {
    authorDisplayName: string;
    authorProfileImageUrl: string;

    textDisplay: string;

    likeCount: number;

    publishedAt: string;
    updatedAt: string;

    parentId?: string;
  };
};

export type YouTubeCommentsResponse = {
  nextPageToken?: string;

  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };

  items: YouTubeCommentItem[];
};
export type YouTubeChannelsResponse = {
  items: Array<{
    id: string;

    snippet: {
      title: string;
      description: string;
      publishedAt: string;

      customUrl?: string;

      thumbnails: YouTubeThumbnails;
    };

    contentDetails: {
      relatedPlaylists: {
        uploads?: string;
      };
    };

    statistics: {
      subscriberCount?: string;
      hiddenSubscriberCount?: boolean;

      videoCount?: string;
      viewCount?: string;
    };

    brandingSettings?: {
      image?: {
        bannerExternalUrl?: string;
        bannerImageUrl?: string;
      };
    };
  }>;
};

export type YouTubeChannelAvatarsResponse = {
  items: Array<{
    id: string;

    snippet: {
      thumbnails: YouTubeThumbnails;
    };
  }>;
};

export type YouTubePlaylistItemsResponse = {
  items: Array<{
    contentDetails: {
      videoId?: string;
    };
  }>;
};
