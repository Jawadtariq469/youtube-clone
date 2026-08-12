import { useCallback, useMemo, useState } from 'react';

import { CategoryBar, VideoGrid, VideoGridShimmer } from '../../components/ui';

import { useHomeFeed } from '../../hooks/useHomeFeed';

import { useInfinitePopularVideos } from '../../hooks/useInfinitePopularVideos';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

import {
  InfiniteScrollSentinel,
  LoadingMoreContainer,
  StatusMessage,
} from './homeView.styles';

import type { CategoryOption, HomeViewProps } from './types';

const ALL_CATEGORY_ID = '0';

const categoryOptions = [
  {
    id: ALL_CATEGORY_ID,
    label: 'All',
  },
  {
    id: '10',
    label: 'Music',
  },
  {
    id: '20',
    label: 'Gaming',
  },
  {
    id: '17',
    label: 'Sports',
  },
  {
    id: '24',
    label: 'Entertainment',
  },
  {
    id: '25',
    label: 'News',
  },
  {
    id: '27',
    label: 'Education',
  },
  {
    id: '28',
    label: 'Science & Technology',
  },
] satisfies readonly CategoryOption[];

const HomeView = ({ onVideoSelect }: HomeViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY_ID);

  const isAllCategory = selectedCategory === ALL_CATEGORY_ID;

  const mixedFeedQuery = useHomeFeed(isAllCategory);

  const categoryFeedQuery = useInfinitePopularVideos(
    selectedCategory,
    !isAllCategory,
  );

  const categoryVideos = useMemo(
    () => categoryFeedQuery.data?.pages.flatMap((page) => page.videos) ?? [],
    [categoryFeedQuery.data],
  );

  const videos = isAllCategory ? mixedFeedQuery.videos : categoryVideos;

  const isPending = isAllCategory
    ? mixedFeedQuery.isPending
    : categoryFeedQuery.isPending;

  const isError = isAllCategory
    ? mixedFeedQuery.isError
    : categoryFeedQuery.isError;

  const error = isAllCategory ? mixedFeedQuery.error : categoryFeedQuery.error;

  const hasNextPage = isAllCategory
    ? mixedFeedQuery.hasNextPage
    : categoryFeedQuery.hasNextPage;

  const isFetchingNextPage = isAllCategory
    ? mixedFeedQuery.isFetchingNextPage
    : categoryFeedQuery.isFetchingNextPage;

  const isFetchNextPageError = isAllCategory
    ? mixedFeedQuery.isFetchNextPageError
    : categoryFeedQuery.isFetchNextPageError;

  const handleLoadMore = useCallback((): void => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    if (isAllCategory) {
      void mixedFeedQuery.fetchNextPage({
        cancelRefetch: false,
      });

      return;
    }

    void categoryFeedQuery.fetchNextPage({
      cancelRefetch: false,
    });
  }, [
    categoryFeedQuery,
    hasNextPage,
    isAllCategory,
    isFetchingNextPage,
    mixedFeedQuery,
  ]);

  const infiniteScrollRef = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage) && !isFetchNextPageError,

    isFetchingNextPage,
    onLoadMore: handleLoadMore,
  });

  const hasInitialError = isError && videos.length === 0;

  return (
    <>
      <CategoryBar
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {isPending && <VideoGridShimmer />}

      {hasInitialError && (
        <StatusMessage>
          Failed to load videos:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </StatusMessage>
      )}

      {!isPending && !isError && videos.length === 0 && (
        <StatusMessage>No videos found.</StatusMessage>
      )}

      {!isPending && videos.length > 0 && (
        <VideoGrid videos={videos} onVideoSelect={onVideoSelect} />
      )}

      {isFetchNextPageError && (
        <StatusMessage>More videos could not be loaded.</StatusMessage>
      )}

      {isFetchingNextPage && (
        <LoadingMoreContainer>
          <VideoGridShimmer />
        </LoadingMoreContainer>
      )}

      {videos.length > 0 && (
        <InfiniteScrollSentinel ref={infiniteScrollRef} aria-hidden="true" />
      )}
    </>
  );
};

export default HomeView;
