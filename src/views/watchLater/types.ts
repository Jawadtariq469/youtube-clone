import type { WatchLaterVideo } from '../../utils/types';

export type WatchLaterFilterId = 'all' | 'videos' | 'shorts';

export type WatchLaterSortId = 'manual' | 'newest' | 'oldest';

export interface WatchLaterFilterOption {
  id: WatchLaterFilterId;
  label: string;
}

export interface WatchLaterSortOption {
  id: WatchLaterSortId;
  label: string;
}

export interface WatchLaterViewProps {
  onVideoSelect: (videoId: string) => void;
}

export interface WatchLaterVideoItemProps {
  watchLaterVideo: WatchLaterVideo;
  isRemoving?: boolean;

  onVideoSelect: (videoId: string) => void;
  onRemove: (videoId: string) => void;
}
export interface WatchLaterShortItemProps {
  watchLaterVideo: WatchLaterVideo;
  isRemoving?: boolean;

  onVideoSelect: (videoId: string) => void;

  onRemove: (videoId: string) => void;
}
export interface WatchLaterSummaryProps {
  videos: readonly WatchLaterVideo[];
  userName: string;

  onPlayAll: () => void;
  onShuffle: () => void;
  onDownloadAll: () => void;
  onClearAll: () => void;
}
