import { useQuery } from '@tanstack/react-query';

import { getSearchSuggestions } from '../services/youtube/getSearchSuggestions';

export const useSearchSuggestions = (searchValue: string) => {
  const normalizedSearchValue = searchValue.trim();

  return useQuery({
    queryKey: [
      'youtube',
      'search-suggestions',
      normalizedSearchValue.toLowerCase(),
    ],

    queryFn: ({ signal }) =>
      getSearchSuggestions(normalizedSearchValue, signal),

    enabled: normalizedSearchValue.length > 0,

    placeholderData: (previousSuggestions) => previousSuggestions,

    staleTime: 10 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    retry: false,
  });
};
