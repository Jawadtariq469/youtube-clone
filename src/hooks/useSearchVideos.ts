import { useQuery } from '@tanstack/react-query';

import { searchVideos } from '../services/youtube/searchVideos';

export const useSearchVideos = (searchQuery: string) => {
  const normalizedQuery = searchQuery.trim();

  return useQuery({
    queryKey: ['youtube', 'search', normalizedQuery],

    queryFn: () => searchVideos(normalizedQuery),

    enabled: normalizedQuery.length > 0,
  });
};
