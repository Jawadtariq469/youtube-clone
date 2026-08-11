import { useState } from 'react';

import { CategoryBar, VideoGrid, VideoGridShimmer } from '../../components/ui';
import { usePopularVideos } from '../../hooks/usePopularVideos';

import { StatusMessage } from './homeView.styles';

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
    data: videos = [],
    isPending,
    isError,
    error,
  } = usePopularVideos(selectedCategory);

  return (
    <>
      <CategoryBar
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {isPending && <VideoGridShimmer />}
      {isError && (
        <StatusMessage>
          Failed to load videos:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </StatusMessage>
      )}

      {!isPending && !isError && videos.length === 0 && (
        <StatusMessage>No videos found.</StatusMessage>
      )}

      {!isPending && !isError && videos.length > 0 && (
        <VideoGrid videos={videos} onVideoSelect={onVideoSelect} />
      )}
    </>
  );
};

export default HomeView;
