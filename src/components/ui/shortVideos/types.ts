import type { Video } from '../../../utils/types';

export interface ShortPlayerProps {
  video: Video;
  isActive: boolean;
}

export interface ShortActionsProps {
  video: Video;

  onOpenWatch: (videoId: string) => void;
}

export interface ShortVideoProps {
  video: Video;
  isActive: boolean;

  onOpenWatch: (videoId: string) => void;
}
