import type { RecommendationFilter, Video } from '../../../utils/types';

export interface RelatedVideosProps {
  videos: readonly Video[];

  filters: readonly RecommendationFilter[];

  selectedFilterId: string;

  onVideoSelect: (videoId: string) => void;
  onFilterSelect: (filterId: string) => void;

  hasMoreVideos?: boolean;
  isLoadingMore?: boolean;

  onLoadMore?: () => Promise<void>;

  isLoading?: boolean;
  isError?: boolean;
}

export interface RelatedVideoItemProps {
  video: Video;

  onVideoSelect: (videoId: string) => void;
}

export interface RecommendationFiltersProps {
  filters: readonly RecommendationFilter[];

  selectedFilterId: string;

  onFilterSelect: (filterId: string) => void;
}

export interface RelatedVideosSkeletonProps {
  itemCount?: number;
}
