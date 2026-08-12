import { useCallback, useState } from 'react';

import { Button } from '../../elements';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import {
  ButtonHtmlType,
  ButtonSize,
  ButtonVariant,
} from '../../../utils/enums';

import RecommendationFilters from './RecommendationFilters';
import RelatedVideoItem from './RelatedVideoItem';
import RelatedVideosSkeleton from './RelatedVideoSkeleton';

import {
  DesktopInfiniteScrollSentinel,
  RelatedStatusMessage,
  RelatedVideosHeading,
  RelatedVideosList,
  RelatedVideosSection,
  ShowMoreContainer,
} from './relatedVideos.styles';

import type { RelatedVideosProps } from './types';

const INITIAL_VISIBLE_VIDEO_COUNT = 8;
const VISIBLE_VIDEO_INCREMENT = 8;

const RelatedVideos = ({
  videos,
  filters,
  selectedFilterId,
  onVideoSelect,
  onFilterSelect,

  hasMoreVideos = false,
  isLoadingMore = false,
  onLoadMore,

  isLoading = false,
  isError = false,
}: RelatedVideosProps) => {
  const [visibleVideoCount, setVisibleVideoCount] = useState(
    INITIAL_VISIBLE_VIDEO_COUNT,
  );

  const visibleVideos = videos.slice(0, visibleVideoCount);

  const hasHiddenVideos = visibleVideoCount < videos.length;

  const canRequestMoreVideos = hasMoreVideos && Boolean(onLoadMore);

  const canLoadMore = hasHiddenVideos || canRequestMoreVideos;

  const handleLoadMore = useCallback(async (): Promise<void> => {
    if (isLoadingMore) {
      return;
    }

    /*
     * First reveal recommendations that have
     * already been downloaded.
     */
    if (hasHiddenVideos) {
      setVisibleVideoCount((currentCount) =>
        Math.min(currentCount + VISIBLE_VIDEO_INCREMENT, videos.length),
      );

      return;
    }

    /*
     * When every cached recommendation is visible,
     * fetch another API page.
     */
    if (!onLoadMore || !hasMoreVideos) {
      return;
    }

    try {
      await onLoadMore();

      setVisibleVideoCount(
        (currentCount) => currentCount + VISIBLE_VIDEO_INCREMENT,
      );
    } catch {
      /*
       * TanStack Query supplies the query error state.
       */
    }
  }, [
    hasHiddenVideos,
    hasMoreVideos,
    isLoadingMore,
    onLoadMore,
    videos.length,
  ]);

  const handleAutomaticLoadMore = useCallback((): void => {
    void handleLoadMore();
  }, [handleLoadMore]);

  /*
   * This changes after cached videos are revealed
   * or new API videos arrive, allowing the scroll
   * detector to become active again.
   */
  const infiniteScrollResetKey = `${selectedFilterId}-${visibleVideoCount}-${videos.length}`;

  const infiniteScrollRef = useInfiniteScroll({
    hasNextPage: canLoadMore,
    isFetchingNextPage: isLoadingMore,
    onLoadMore: handleAutomaticLoadMore,
    resetKey: infiniteScrollResetKey,
  });

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
        <>
          <RelatedVideosList>
            {visibleVideos.map((video) => (
              <RelatedVideoItem
                key={video.id}
                video={video}
                onVideoSelect={onVideoSelect}
              />
            ))}
          </RelatedVideosList>

          {isLoadingMore && <RelatedVideosSkeleton itemCount={3} />}

          {canLoadMore && (
            <>
              <DesktopInfiniteScrollSentinel
                ref={infiniteScrollRef}
                aria-hidden="true"
              />

              <ShowMoreContainer>
                <Button
                  type={ButtonHtmlType.Button}
                  variant={ButtonVariant.Secondary}
                  size={ButtonSize.Medium}
                  isFullWidth
                  disabled={isLoadingMore}
                  onClick={() => {
                    void handleLoadMore();
                  }}
                >
                  {isLoadingMore ? 'Loading...' : 'Show more'}
                </Button>
              </ShowMoreContainer>
            </>
          )}
        </>
      )}
    </RelatedVideosSection>
  );
};

export default RelatedVideos;
