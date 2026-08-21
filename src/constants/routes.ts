export const AppRoutes = {
  Home: '/',
  Results: '/results',
  Watch: '/watch',
  Shorts: '/shorts',
  Subscriptions: '/subscriptions',
  History: '/history',
  Downloads: '/downloads',
  LikedVideos: '/liked-videos',
  Channel: '/channel/:channelId',
  WatchLater: '/watch-later',
} as const;

export const getChannelPath = (channelId: string): string => {
  return `/channel/${encodeURIComponent(channelId)}`;
};

export const AppQueryParameters = {
  SearchQuery: 'search_query',
  VideoId: 'v',
} as const;
