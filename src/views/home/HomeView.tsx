import { useCallback, useMemo, useState } from 'react';

import { CategoryBar, VideoGrid, VideoGridShimmer } from '../../components/ui';
import { useInfinitePopularVideos } from '../../hooks/useInfinitePopularVideos';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

import {
  InfiniteScrollSentinel,
  LoadingMoreContainer,
  StatusMessage,
} from './homeView.styles';

import type { CategoryOption, HomeViewProps } from './types';

const categoryOptions = [
  {
    id: '0',
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
  const [selectedCategory, setSelectedCategory] = useState('0');

  const {
    data,
    isPending,
    isError,
    error,

    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
  } = useInfinitePopularVideos(selectedCategory);

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
