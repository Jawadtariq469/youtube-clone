import type { Video } from './video';

export type LikedVideo = Video & {
  likedAt: string;
};
