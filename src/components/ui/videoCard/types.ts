import type { Video } from '../../../utils/types';

export type VideoCardProps = {
  video: Video;
  onSelect?: (videoId: string) => void;
};
