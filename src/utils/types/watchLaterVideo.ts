import type { Video } from './video';

export type WatchLaterVideo = Video & {
  savedAt: string;
};
