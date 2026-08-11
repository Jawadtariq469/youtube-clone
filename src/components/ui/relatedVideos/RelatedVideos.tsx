import RecommendationFilters from './RecommendationFilters';
import RelatedVideoItem from './RelatedVideoItem';
import RelatedVideosSkeleton from './RelatedVideoSkeleton';

import {
  RelatedStatusMessage,
  RelatedVideosHeading,
  RelatedVideosList,
  RelatedVideosSection,
} from './relatedVideos.styles';

import type { RelatedVideosProps } from './types';

const RelatedVideos = ({
  videos,
  filters,
  selectedFilterId,
  onVideoSelect,
  onFilterSelect,
  isLoading = false,
  isError = false,
}: RelatedVideosProps) => {
  return (
    <RelatedVideosSection>
      <RelatedVideosHeading>Recommended</RelatedVideosHeading>

      {filters.length > 0 && (
        <RecommendationFilters
          filters={filters}
          selectedFilterId={selectedFilterId}
          onFilterSelect={onFilterSelect}
        />
      )}

      {isLoading && <RelatedVideosSkeleton />}

      {!isLoading && isError && (
        <RelatedStatusMessage>
          Recommendations could not be loaded.
        </RelatedStatusMessage>
      )}

      {!isLoading && !isError && videos.length === 0 && (
        <RelatedStatusMessage>
          No recommendations are available.
        </RelatedStatusMessage>
      )}

      {!isLoading && !isError && videos.length > 0 && (
        <RelatedVideosList>
          {videos.map((video) => (
            <RelatedVideoItem
              key={video.id}
              video={video}
              onVideoSelect={onVideoSelect}
            />
          ))}
        </RelatedVideosList>
      )}
    </RelatedVideosSection>
  );
};

export default RelatedVideos;
