import type { Video } from '../../../utils/types';

export interface SearchResultCardProps {
  video: Video;

  onSelect?: (videoId: string) => void;
}
