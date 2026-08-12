import { Button } from '../../elements';
import { useCommentReplies } from '../../../hooks/useCommentReplies';
import {
  ButtonHtmlType,
  ButtonSize,
  ButtonVariant,
} from '../../../utils/enums';

import CommentEntry from './CommentEntry';

import {
  CommentButtonRow,
  CommentRepliesContainer,
  CommentRepliesList,
  CommentReplyStatus,
} from './comment.styles';

import type { CommentRepliesProps } from './types';

const CommentReplies = ({ parentCommentId }: CommentRepliesProps) => {
  const {
    data,
    isPending,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCommentReplies(parentCommentId);

  const replies = data?.pages.flatMap((page) => page.replies) ?? [];

  const handleLoadMoreReplies = (): void => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }

    void fetchNextPage();
  };

  if (isPending) {
    return <CommentReplyStatus>Loading replies...</CommentReplyStatus>;
  }

  if (isError) {
    return (
      <CommentReplyStatus>Replies could not be loaded.</CommentReplyStatus>
    );
  }

  if (replies.length === 0) {
    return <CommentReplyStatus>No replies are available.</CommentReplyStatus>;
  }

  return (
    <CommentRepliesContainer>
      <CommentRepliesList>
        {replies.map((reply) => (
          <CommentEntry key={reply.id} entry={reply} variant="reply" />
        ))}
      </CommentRepliesList>

      {hasNextPage && (
        <CommentButtonRow>
          <Button
            type={ButtonHtmlType.Button}
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Small}
            disabled={isFetchingNextPage}
            onClick={handleLoadMoreReplies}
          >
            {isFetchingNextPage ? 'Loading replies...' : 'Load more replies'}
          </Button>
        </CommentButtonRow>
      )}
    </CommentRepliesContainer>
  );
};

export default CommentReplies;
