import type { Video } from '../../../utils/types';

export interface SearchResultsProps {
  videos: readonly Video[];

  onVideoSelect?: (videoId: string) => void;
}
