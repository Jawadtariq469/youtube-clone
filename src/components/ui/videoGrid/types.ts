import type { Video } from '../../../utils/types';

export type VideoGridProps = {
  videos: Video[];
  onVideoSelect?: (videoId: string) => void;
};
