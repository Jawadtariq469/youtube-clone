import { useQuery } from '@tanstack/react-query';

import { getChannelById } from '../services/youtube/getChannelById';

const CHANNEL_DETAILS_QUERY_KEY = ['youtube', 'channel-details'] as const;

export const useChannelDetails = (channelId: string) => {
  const normalizedChannelId = channelId.trim();

  return useQuery({
    queryKey: [...CHANNEL_DETAILS_QUERY_KEY, normalizedChannelId],

    queryFn: () => getChannelById(normalizedChannelId),

    enabled: normalizedChannelId.length > 0,

    staleTime: 10 * 60 * 1000,
  });
};
