import SearchResultCard from '../searchResultCard/SearchResultCard';

import { SearchResultsContainer } from './searchResults.styles';

import type { SearchResultsProps } from './types';

const SearchResults = ({ videos, onVideoSelect }: SearchResultsProps) => {
  return (
    <SearchResultsContainer>
      {videos.map((video) => (
        <SearchResultCard
          key={video.id}
          video={video}
          onSelect={onVideoSelect}
        />
      ))}
    </SearchResultsContainer>
  );
};

export default SearchResults;
