import { Skeleton } from '../../elements';

import {
  RelatedSkeletonDetails,
  RelatedSkeletonItem,
  RelatedVideosList,
} from './relatedVideos.styles';

import type { RelatedVideosSkeletonProps } from './types';

const DEFAULT_SKELETON_ITEM_COUNT = 7;

const RelatedVideosSkeleton = ({
  itemCount = DEFAULT_SKELETON_ITEM_COUNT,
}: RelatedVideosSkeletonProps) => {
  return (
    <RelatedVideosList aria-label="Loading recommendations" aria-busy="true">
      {Array.from({
        length: itemCount,
      }).map((_, index) => (
        <RelatedSkeletonItem key={index}>
          <Skeleton aspectRatio="16 / 9" borderRadius="8px" />

          <RelatedSkeletonDetails>
            <Skeleton width="95%" height="14px" />

            <Skeleton width="78%" height="14px" />

            <Skeleton width="55%" height="12px" />

            <Skeleton width="65%" height="12px" />
          </RelatedSkeletonDetails>
        </RelatedSkeletonItem>
      ))}
    </RelatedVideosList>
  );
};

export default RelatedVideosSkeleton;
