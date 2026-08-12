import { useCallback, useMemo } from 'react';

import { useInfinitePopularVideos } from './useInfinitePopularVideos';
import { useInfiniteSearchVideos } from './useInfiniteSearchVideos';

import {
  createRecommendationFilters,
  getPrimaryRecommendationQuery,
  getUniqueRecommendationVideos,
  mixRecommendationVideos,
} from '../utils/recommendations';

import type { RecommendationFilter, Video } from '../utils/types';

const ALL_FILTER: RecommendationFilter = {
  id: 'all',
  label: 'All',
  kind: 'mixed',
};

export const useWatchRecommendations = (
  video: Video | null | undefined,
  requestedFilterId: string,
) => {
  const filters = useMemo(() => createRecommendationFilters(video), [video]);

  const selectedFilter =
    filters.find((filter) => filter.id === requestedFilterId) ?? ALL_FILTER;

  const searchQuery =
    selectedFilter.kind === 'mixed'
      ? getPrimaryRecommendationQuery(video)
      : selectedFilter.kind === 'search'
        ? selectedFilter.query
        : '';

  const selectedCategoryId =
    selectedFilter.kind === 'category'
      ? selectedFilter.categoryId
      : (video?.category ?? '0');

  const {
    data: searchData,

    isPending: isSearchPending,
    isError: isSearchError,

    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,

    fetchNextPage: fetchNextSearchPage,
  } = useInfiniteSearchVideos(searchQuery);

  const {
    data: categoryData,

    isPending: isCategoryPending,
    isError: isCategoryError,

    hasNextPage: hasNextCategoryPage,
    isFetchingNextPage: isFetchingNextCategoryPage,

    fetchNextPage: fetchNextCategoryPage,
  } = useInfinitePopularVideos(selectedCategoryId);

  const {
    data: trendingData,

    isPending: isTrendingPending,
    isError: isTrendingError,

    hasNextPage: hasNextTrendingPage,
    isFetchingNextPage: isFetchingNextTrendingPage,

    fetchNextPage: fetchNextTrendingPage,
  } = useInfinitePopularVideos('0');

  const searchedVideos = useMemo(
    () => searchData?.pages.flatMap((page) => page.videos) ?? [],
    [searchData],
  );

  const categoryVideos = useMemo(
    () => categoryData?.pages.flatMap((page) => page.videos) ?? [],
    [categoryData],
  );

  const trendingVideos = useMemo(
    () => trendingData?.pages.flatMap((page) => page.videos) ?? [],
    [trendingData],
  );

  const recommendationVideos = useMemo(() => {
    if (!video) {
      return [];
    }

    if (selectedFilter.kind === 'mixed') {
      return mixRecommendationVideos(video, [
        searchedVideos,
        categoryVideos,
        trendingVideos,
      ]);
    }

    /*
     * A search filter now falls back to
     * trending recommendations instead of
     * ending when its search pages finish.
     */
    if (selectedFilter.kind === 'search') {
      return mixRecommendationVideos(video, [searchedVideos, trendingVideos]);
    }

    /*
     * A category filter also falls back to
     * trending recommendations.
     */
    if (selectedFilter.kind === 'category') {
      return mixRecommendationVideos(video, [categoryVideos, trendingVideos]);
    }

    return getUniqueRecommendationVideos(trendingVideos, video.id);
  }, [video, selectedFilter, searchedVideos, categoryVideos, trendingVideos]);

  const hasSearchQuery = searchQuery.length > 0;

  const isSelectedSourcePending =
    selectedFilter.kind === 'mixed'
      ? (hasSearchQuery && isSearchPending) ||
        isCategoryPending ||
        isTrendingPending
      : selectedFilter.kind === 'search'
        ? isSearchPending || isTrendingPending
        : selectedFilter.kind === 'category'
          ? isCategoryPending || isTrendingPending
          : isTrendingPending;

  const haveAllMixedSourcesFailed =
    (!hasSearchQuery || isSearchError) && isCategoryError && isTrendingError;

  const isSelectedSourceError =
    selectedFilter.kind === 'mixed'
      ? haveAllMixedSourcesFailed
      : selectedFilter.kind === 'search'
        ? isSearchError && isTrendingError
        : selectedFilter.kind === 'category'
          ? isCategoryError && isTrendingError
          : isTrendingError;

  const hasMoreVideos =
    selectedFilter.kind === 'mixed'
      ? Boolean(
          (hasSearchQuery && hasNextSearchPage) ||
          (selectedCategoryId !== '0' && hasNextCategoryPage) ||
          hasNextTrendingPage,
        )
      : selectedFilter.kind === 'search'
        ? Boolean(hasNextSearchPage || hasNextTrendingPage)
        : selectedFilter.kind === 'category'
          ? Boolean(
              (selectedCategoryId !== '0' && hasNextCategoryPage) ||
              hasNextTrendingPage,
            )
          : Boolean(hasNextTrendingPage);

  const isLoadingMore =
    selectedFilter.kind === 'mixed'
      ? Boolean(
          (hasSearchQuery && isFetchingNextSearchPage) ||
          (selectedCategoryId !== '0' && isFetchingNextCategoryPage) ||
          isFetchingNextTrendingPage,
        )
      : selectedFilter.kind === 'search'
        ? Boolean(isFetchingNextSearchPage || isFetchingNextTrendingPage)
        : selectedFilter.kind === 'category'
          ? Boolean(
              (selectedCategoryId !== '0' && isFetchingNextCategoryPage) ||
              isFetchingNextTrendingPage,
            )
          : isFetchingNextTrendingPage;

  const loadMoreRecommendations = useCallback(async (): Promise<void> => {
    if (isLoadingMore) {
      return;
    }

    const availableSources: Array<() => Promise<unknown>> = [];

    const canLoadSearch =
      (selectedFilter.kind === 'mixed' || selectedFilter.kind === 'search') &&
      hasSearchQuery &&
      hasNextSearchPage;

    const canLoadCategory =
      (selectedFilter.kind === 'mixed' || selectedFilter.kind === 'category') &&
      selectedCategoryId !== '0' &&
      hasNextCategoryPage;

    /*
     * Trending is the final fallback for
     * every recommendation filter.
     */
    const canLoadTrending = hasNextTrendingPage;

    if (canLoadSearch) {
      availableSources.push(() =>
        fetchNextSearchPage({
          cancelRefetch: false,
        }),
      );
    }

    if (canLoadCategory) {
      availableSources.push(() =>
        fetchNextCategoryPage({
          cancelRefetch: false,
        }),
      );
    }

    if (canLoadTrending) {
      availableSources.push(() =>
        fetchNextTrendingPage({
          cancelRefetch: false,
        }),
      );
    }

    if (availableSources.length === 0) {
      return;
    }

    /*
     * Fetch sources together so one slow or
     * duplicate-heavy source cannot prevent
     * the list from growing.
     */
    await Promise.all(availableSources.map((fetchSource) => fetchSource()));
  }, [
    fetchNextCategoryPage,
    fetchNextSearchPage,
    fetchNextTrendingPage,

    hasNextCategoryPage,
    hasNextSearchPage,
    hasNextTrendingPage,
    hasSearchQuery,

    isLoadingMore,

    selectedCategoryId,
    selectedFilter.kind,
  ]);

  return {
    filters,

    selectedFilterId: selectedFilter.id,

    videos: recommendationVideos,

    hasMoreVideos,
    isLoadingMore,
    loadMoreRecommendations,

    isLoading:
      Boolean(video) &&
      recommendationVideos.length === 0 &&
      isSelectedSourcePending,

    isError:
      Boolean(video) &&
      recommendationVideos.length === 0 &&
      isSelectedSourceError,
  };
};
