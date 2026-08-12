import type { WatchHistoryItem } from '../../utils/types';

export interface HistoryViewProps {
  onVideoSelect: (videoId: string) => void;
}

export interface HistoryVideoItemProps {
  historyItem: WatchHistoryItem;

  isRemoving?: boolean;

  onVideoSelect: (videoId: string) => void;

  onRemove: (videoId: string) => void;
}
