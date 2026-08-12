import type { Video } from './video';

export type WatchHistoryItem = Video & {
  watchedAt: string;
};
