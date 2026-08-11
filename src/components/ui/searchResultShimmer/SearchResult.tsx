import { Skeleton } from '../../elements';

import {
  ShimmerChannelInformation,
  ShimmerDescription,
  ShimmerResultInformation,
  ShimmerResultItem,
  ShimmerResults,
} from './searchResultsShimmer.styles';

import type { SearchResultsShimmerProps } from './types';

const SearchResultsShimmer = ({ itemCount = 5 }: SearchResultsShimmerProps) => {
  return (
    <ShimmerResults aria-label="Loading search results" aria-busy="true">
      {Array.from({
        length: itemCount,
      }).map((_, index) => (
        <ShimmerResultItem key={index}>
          <Skeleton aspectRatio="16 / 9" borderRadius="12px" />

          <ShimmerResultInformation>
            <Skeleton width="85%" height="20px" />

            <Skeleton width="65%" height="20px" />

            <Skeleton width="38%" height="13px" />

            <ShimmerChannelInformation>
              <Skeleton width="28px" height="28px" borderRadius="50%" />

              <Skeleton width="140px" height="13px" />
            </ShimmerChannelInformation>

            <ShimmerDescription>
              <Skeleton width="92%" height="13px" />

              <Skeleton width="72%" height="13px" />
            </ShimmerDescription>
          </ShimmerResultInformation>
        </ShimmerResultItem>
      ))}
    </ShimmerResults>
  );
};

export default SearchResultsShimmer;
