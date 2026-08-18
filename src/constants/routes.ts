export const AppRoutes = {
  Home: '/',
  Results: '/results',
  Watch: '/watch',
  Shorts: '/shorts',
  Subscriptions: '/subscriptions',
  History: '/history',
  Channel: '/channel/:channelId',
} as const;

export const getChannelPath = (channelId: string): string => {
  return `/channel/${encodeURIComponent(channelId)}`;
};

export const AppQueryParameters = {
  SearchQuery: 'search_query',
  VideoId: 'v',
} as const;
