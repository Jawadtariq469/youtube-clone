export type Video = {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  channelAvatarUrl?: string;
  viewCount: number;
  publishedAt: string;
  duration?: string;
  category: string;
  description?: string;
};
