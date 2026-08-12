import { useState } from 'react';

import { Button } from '../../elements';
import {
  ButtonHtmlType,
  ButtonSize,
  ButtonVariant,
} from '../../../utils/enums';

import CommentEntry from './CommentEntry';
import CommentReplies from './CommentReplies';

import { CommentRepliesArea, CommentThreadContainer } from './comment.styles';

import type { CommentThreadProps } from './types';

const CommentThread = ({ comment }: CommentThreadProps) => {
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);

  const handleRepliesToggle = (): void => {
    setAreRepliesVisible((currentValue) => !currentValue);
  };

  const replyLabel = comment.replyCount === 1 ? 'reply' : 'replies';

  return (
    <CommentThreadContainer>
      <CommentEntry entry={comment} />

      {comment.replyCount > 0 && (
        <CommentRepliesArea>
          <Button
            type={ButtonHtmlType.Button}
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Small}
            aria-expanded={areRepliesVisible}
            onClick={handleRepliesToggle}
          >
            {areRepliesVisible
              ? 'Hide replies'
              : `View ${comment.replyCount} ${replyLabel}`}
          </Button>

          {areRepliesVisible && <CommentReplies parentCommentId={comment.id} />}
        </CommentRepliesArea>
      )}
    </CommentThreadContainer>
  );
};

export default CommentThread;
