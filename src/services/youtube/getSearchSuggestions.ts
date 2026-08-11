import { searchSuggestionsApi } from '../../config/searchSuggestionsApi';

import type { SearchSuggestionsResponse } from './types';

const MAX_SUGGESTIONS = 10;

export const getSearchSuggestions = async (
  searchValue: string,
  signal?: AbortSignal,
): Promise<string[]> => {
  const normalizedSearchValue = searchValue.trim();

  if (!normalizedSearchValue) {
    return [];
  }

  const response = await searchSuggestionsApi.get<SearchSuggestionsResponse>(
    '',
    {
      params: {
        client: 'firefox',
        ds: 'yt',
        q: normalizedSearchValue,
      },

      signal,
    },
  );

  return (response.data[1] ?? []).slice(0, MAX_SUGGESTIONS);
};
