import type { Video } from './video';

export type DownloadedVideo = Video & {
  downloadedAt: string;
};
