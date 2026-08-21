import type { WatchHistoryItem } from '../../utils/types';

export type HistoryFilterId =
  'all' | 'videos' | 'shorts' | 'podcasts' | 'music';

export interface HistoryFilterOption {
  id: HistoryFilterId;
  label: string;
}

export interface HistoryDateGroup {
  id: string;
  label: string;
  items: WatchHistoryItem[];
}

export interface HistoryViewProps {
  onVideoSelect: (videoId: string) => void;
}

export interface HistoryVideoItemProps {
  historyItem: WatchHistoryItem;

  isRemoving?: boolean;

  onVideoSelect: (videoId: string) => void;

  onRemove: (videoId: string) => void;
}
