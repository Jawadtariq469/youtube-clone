import { useSearchParams } from 'react-router';

import { SearchResults } from '../../components/ui';
import { AppConstants, AppQueryParameters } from '../../constants';
import { useSearchVideos } from '../../hooks/useSearchVideos';

import { StatusMessage } from './searchResultsView.styles';

import type { SearchResultsViewProps } from './types';

const SearchResultsView = ({ onVideoSelect }: SearchResultsViewProps) => {
  const [searchParameters] = useSearchParams();

  const searchQuery =
    searchParameters.get(AppQueryParameters.SearchQuery)?.trim() ??
    AppConstants.EmptyString;

  const {
    data: videos = [],
    isPending,
    isError,
    error,
  } = useSearchVideos(searchQuery);

  if (!searchQuery) {
    return <StatusMessage>Enter something in the search bar.</StatusMessage>;
  }

  if (isPending) {
    return <StatusMessage>Loading search results...</StatusMessage>;
  }

  if (isError) {
    return (
      <StatusMessage>
        Failed to load search results:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </StatusMessage>
    );
  }

  if (videos.length === 0) {
    return <StatusMessage>No results found for “{searchQuery}”.</StatusMessage>;
  }

  return <SearchResults videos={videos} onVideoSelect={onVideoSelect} />;
};

export default SearchResultsView;
