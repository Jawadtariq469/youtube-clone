import { useState } from 'react';

import { RelatedVideos } from '../../components/ui';
import { useWatchRecommendations } from '../../hooks/useWatchRecommendations';

import type {
  RecommendationSelection,
  WatchRecommendationsProps,
} from './types';

const ALL_FILTER_ID = 'all';

const WatchRecommendations = ({
  video,
  currentVideoId,
  isVideoLoading,
  onVideoSelect,
}: WatchRecommendationsProps) => {
  const [filterSelection, setFilterSelection] =
    useState<RecommendationSelection>({
      videoId: currentVideoId,
      filterId: ALL_FILTER_ID,
    });

  const requestedFilterId =
    filterSelection.videoId === currentVideoId
      ? filterSelection.filterId
      : ALL_FILTER_ID;

  const { filters, selectedFilterId, videos, isLoading, isError } =
    useWatchRecommendations(video, requestedFilterId);

  const handleFilterSelect = (filterId: string): void => {
    setFilterSelection({
      videoId: currentVideoId,
      filterId,
    });
  };

  return (
    <RelatedVideos
      videos={videos}
      filters={filters}
      selectedFilterId={selectedFilterId}
      onVideoSelect={onVideoSelect}
      onFilterSelect={handleFilterSelect}
      isLoading={isVideoLoading || isLoading}
      isError={isError}
    />
  );
};

export default WatchRecommendations;
