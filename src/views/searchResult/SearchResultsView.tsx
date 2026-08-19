import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { SearchResults, SearchResultsShimmer } from '../../components/ui';
import { AppConstants, AppQueryParameters } from '../../constants';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useInfiniteSearchVideos } from '../../hooks/useInfiniteSearchVideos';

import {
  InfiniteScrollSentinel,
  LoadingMoreContainer,
  StatusMessage,
} from './searchResultsView.styles';

import type { SearchResultsViewProps } from './types';

const SearchResultsView = ({ onVideoSelect }: SearchResultsViewProps) => {
  const [searchParameters] = useSearchParams();

  const searchQuery =
    searchParameters.get(AppQueryParameters.SearchQuery)?.trim() ??
    AppConstants.EmptyString;

  const {
    data,
    isPending,
    isError,
    error,

    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
  } = useInfiniteSearchVideos(searchQuery);

  const videos = useMemo(
    () => data?.pages.flatMap((page) => page.videos) ?? [],
    [data],
  );

  const handleLoadMore = useCallback((): void => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    void fetchNextPage({
      cancelRefetch: false,
    });
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const infiniteScrollRef = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage) && !isFetchNextPageError,

    isFetchingNextPage,
    onLoadMore: handleLoadMore,
  });

  if (!searchQuery) {
    return <StatusMessage>Enter something in the search bar.</StatusMessage>;
  }

  if (isPending) {
    return <SearchResultsShimmer />;
  }

  if (isError && videos.length === 0) {
    return (
      <StatusMessage>
        No results found for “{searchQuery}”.
        {error instanceof Error ? error.message : 'Unknown error'}
      </StatusMessage>
    );
  }

  if (videos.length === 0) {
    return <StatusMessage>No results found for “{searchQuery}”.</StatusMessage>;
  }

  return (
    <>
      <SearchResults videos={videos} onVideoSelect={onVideoSelect} />

      {isFetchNextPageError && (
        <StatusMessage>More search results could not be loaded.</StatusMessage>
      )}

      {isFetchingNextPage && (
        <LoadingMoreContainer>
          <SearchResultsShimmer />
        </LoadingMoreContainer>
      )}

      <InfiniteScrollSentinel ref={infiniteScrollRef} aria-hidden="true" />
    </>
  );
};

export default SearchResultsView;
