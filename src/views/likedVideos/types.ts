import type { LikedVideo } from '../../utils/types';

export type LikedVideosFilterId = 'all' | 'videos' | 'shorts';

export interface LikedVideosFilterOption {
  id: LikedVideosFilterId;
  label: string;
}

export interface LikedVideosViewProps {
  onVideoSelect: (videoId: string) => void;
}

export interface LikedVideoItemProps {
  likedVideo: LikedVideo;
  isRemoving?: boolean;

  onVideoSelect: (videoId: string) => void;
  onRemove: (videoId: string) => void;
}

export interface LikedShortItemProps {
  likedVideo: LikedVideo;
  isRemoving?: boolean;

  onVideoSelect: (videoId: string) => void;
  onRemove: (videoId: string) => void;
}

export interface LikedVideosSummaryProps {
  videos: readonly LikedVideo[];
  userName: string;

  onPlayAll: () => void;
  onShuffle: () => void;
  onDownloadAll: () => void;
  onClearAll: () => void;
}
