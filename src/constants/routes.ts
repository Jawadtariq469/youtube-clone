export const AppRoutes = {
  Home: '/',
  Results: '/results',
  Watch: '/watch',
  Shorts: '/shorts',
  Subscriptions: '/subscriptions',
  History: '/history',
} as const;

export const AppQueryParameters = {
  SearchQuery: 'search_query',
  VideoId: 'v',
} as const;
