import { useQuery } from '@tanstack/react-query';

import { getVideoById } from '../services/youtube/getVideoById';

export const useVideoDetails = (videoId: string) => {
  const normalizedVideoId = videoId.trim();

  return useQuery({
    queryKey: ['youtube', 'video', normalizedVideoId],

    queryFn: ({ signal }) => getVideoById(normalizedVideoId, signal),

    enabled: normalizedVideoId.length > 0,

    staleTime: 10 * 60 * 1000,
  });
};
