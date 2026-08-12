import { Button } from '../../elements';
import { formatViewCount } from '../../../utils/videoFormatters';
import {
  ButtonHtmlType,
  ButtonSize,
  ButtonVariant,
} from '../../../utils/enums';

import CommentComposer from './CommentComposer';
import CommentThread from './CommentThread';
import CommentsSkeleton from './CommentsSkeleton';

import {
  CommentButtonRow,
  CommentsHeading,
  CommentsList,
  CommentsSection,
  CommentsStatusMessage,
} from './comment.styles';

import type { CommentsProps } from './types';

const Comments = ({
  comments,
  totalComments,
  currentUser,
  isAuthLoading = false,
  isLoading = false,
  isError = false,
  isCommentsDisabled = false,
  hasMoreComments = false,
  isLoadingMore = false,
  onSignIn,
  onCommentSubmit,
  onLoadMore,
}: CommentsProps) => {
  const commentsHeading =
    totalComments > 0
      ? `${formatViewCount(totalComments)} Comments`
      : 'Comments';

  const shouldDisplayComposer = !isLoading && !isCommentsDisabled && !isError;

  const shouldDisplayComments = shouldDisplayComposer && comments.length > 0;

  return (
    <CommentsSection aria-labelledby="comments-heading">
      <CommentsHeading id="comments-heading">{commentsHeading}</CommentsHeading>

      {shouldDisplayComposer && (
        <CommentComposer
          user={currentUser}
          isAuthLoading={isAuthLoading}
          onSignIn={onSignIn}
          onSubmit={onCommentSubmit}
        />
      )}

      {isLoading && <CommentsSkeleton />}

      {!isLoading && isCommentsDisabled && (
        <CommentsStatusMessage>
          Comments are turned off for this video.
        </CommentsStatusMessage>
      )}

      {!isLoading && !isCommentsDisabled && isError && (
        <CommentsStatusMessage>
          Comments could not be loaded.
        </CommentsStatusMessage>
      )}

      {!isLoading &&
        !isCommentsDisabled &&
        !isError &&
        comments.length === 0 && (
          <CommentsStatusMessage>
            No comments have been posted yet.
          </CommentsStatusMessage>
        )}

      {shouldDisplayComments && (
        <>
          <CommentsList>
            {comments.map((comment) => (
              <CommentThread key={comment.id} comment={comment} />
            ))}
          </CommentsList>

          {hasMoreComments && (
            <CommentButtonRow>
              <Button
                type={ButtonHtmlType.Button}
                variant={ButtonVariant.Secondary}
                size={ButtonSize.Small}
                disabled={isLoadingMore}
                onClick={onLoadMore}
              >
                {isLoadingMore ? 'Loading comments...' : 'Load more comments'}
              </Button>
            </CommentButtonRow>
          )}
        </>
      )}
    </CommentsSection>
  );
};

export default Comments;
