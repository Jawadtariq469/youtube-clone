import { Skeleton } from '../../elements';

import {
  CommentSkeletonContainer,
  CommentSkeletonContent,
  CommentsList,
} from './comment.styles';

const COMMENTS_SKELETON_COUNT = 5;

const CommentsSkeleton = () => {
  return (
    <CommentsList aria-label="Loading comments" aria-busy="true">
      {Array.from({
        length: COMMENTS_SKELETON_COUNT,
      }).map((_, index) => (
        <CommentSkeletonContainer key={index}>
          <Skeleton width="40px" height="40px" borderRadius="50%" />

          <CommentSkeletonContent>
            <Skeleton width="160px" height="13px" />

            <Skeleton width="95%" height="14px" />

            <Skeleton width="75%" height="14px" />

            <Skeleton width="110px" height="12px" />
          </CommentSkeletonContent>
        </CommentSkeletonContainer>
      ))}
    </CommentsList>
  );
};

export default CommentsSkeleton;
