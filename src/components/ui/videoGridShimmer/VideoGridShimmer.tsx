import { Skeleton } from '../../elements';

import {
  ShimmerCard,
  ShimmerDetails,
  ShimmerGrid,
  ShimmerInformation,
} from './videoGridShimmer.styles';

import type { VideoGridShimmerProps } from './types';

const VideoGridShimmer = ({ itemCount = 8 }: VideoGridShimmerProps) => {
  return (
    <ShimmerGrid aria-label="Loading videos" aria-busy="true">
      {Array.from({
        length: itemCount,
      }).map((_, index) => (
        <ShimmerCard key={index}>
          <Skeleton aspectRatio="16 / 9" borderRadius="12px" />

          <ShimmerInformation>
            <Skeleton width="36px" height="36px" borderRadius="50%" />

            <ShimmerDetails>
              <Skeleton width="90%" height="16px" />

              <Skeleton width="70%" height="16px" />

              <Skeleton width="48%" height="13px" />

              <Skeleton width="62%" height="13px" />
            </ShimmerDetails>
          </ShimmerInformation>
        </ShimmerCard>
      ))}
    </ShimmerGrid>
  );
};

export default VideoGridShimmer;
