export interface SubscribableChannel {
  channelId: string;
  channelTitle: string;

  channelAvatarUrl?: string;
}

export interface ChannelDetails extends SubscribableChannel {
  description: string;
  publishedAt: string;

  customUrl?: string;
  bannerUrl?: string;

  subscriberCount?: number;
  videoCount: number;
  viewCount: number;

  uploadsPlaylistId: string;
}
