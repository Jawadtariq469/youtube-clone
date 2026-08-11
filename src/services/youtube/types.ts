type YouTubeThumbnail = {
  url: string;
  width?: number;
  height?: number;
};

type YouTubeThumbnails = {
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
