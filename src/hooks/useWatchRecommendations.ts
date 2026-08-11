import { useMemo } from 'react';

import { usePopularVideos } from './usePopularVideos';
import { useSearchVideos } from './useSearchVideos';

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
    data: searchedVideos = [],
    isPending: isSearchPending,
    isError: isSearchError,
  } = useSearchVideos(searchQuery);

  const {
    data: categoryVideos = [],
    isPending: isCategoryPending,
    isError: isCategoryError,
  } = usePopularVideos(selectedCategoryId);

  const {
    data: trendingVideos = [],
    isPending: isTrendingPending,
    isError: isTrendingError,
  } = usePopularVideos('0');

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

    if (selectedFilter.kind === 'search') {
      return getUniqueRecommendationVideos(searchedVideos, video.id);
    }

    if (selectedFilter.kind === 'category') {
      return getUniqueRecommendationVideos(categoryVideos, video.id);
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
        ? isSearchPending
        : selectedFilter.kind === 'category'
          ? isCategoryPending
          : isTrendingPending;

  const haveAllMixedSourcesFailed =
    (!hasSearchQuery || isSearchError) && isCategoryError && isTrendingError;

  const isSelectedSourceError =
    selectedFilter.kind === 'mixed'
      ? haveAllMixedSourcesFailed
      : selectedFilter.kind === 'search'
        ? isSearchError
        : selectedFilter.kind === 'category'
          ? isCategoryError
          : isTrendingError;

  return {
    filters,
    selectedFilterId: selectedFilter.id,
    videos: recommendationVideos,

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
