import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getSubscriptionVideos } from '../services/youtube/getSubscriptionVideos';

const SUBSCRIPTION_VIDEOS_QUERY_KEY = [
  'youtube',
  'subscription-videos',
] as const;

const SUBSCRIPTION_VIDEOS_STALE_TIME = 5 * 60 * 1000;

export const useSubscriptionVideos = (channelIds: readonly string[]) => {
  const normalizedChannelIds = useMemo(
    () =>
      Array.from(
        new Set(
          channelIds.map((channelId) => channelId.trim()).filter(Boolean),
        ),
      ).sort(),
    [channelIds],
  );

  return useQuery({
    queryKey: [...SUBSCRIPTION_VIDEOS_QUERY_KEY, normalizedChannelIds],

    queryFn: () => getSubscriptionVideos(normalizedChannelIds),

    enabled: normalizedChannelIds.length > 0,

    staleTime: SUBSCRIPTION_VIDEOS_STALE_TIME,
  });
};
