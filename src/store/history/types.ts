import type { WatchHistoryItem } from '../../utils/types';

export interface HistoryState {
  items: WatchHistoryItem[];

  isLoading: boolean;
  isInitialized: boolean;
  isMutating: boolean;

  error: string | null;
}
