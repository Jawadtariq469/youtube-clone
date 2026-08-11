import { VideoCard } from '../index';

import { EmptyMessage, GridContainer } from './videoGrid.styles';

import type { VideoGridProps } from './types';

const VideoGrid = ({ videos, onVideoSelect }: VideoGridProps) => {
  if (videos.length === 0) {
    return <EmptyMessage>No videos are available.</EmptyMessage>;
  }

  return (
    <GridContainer aria-label="Videos">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onSelect={onVideoSelect} />
      ))}
    </GridContainer>
  );
};

export default VideoGrid;
