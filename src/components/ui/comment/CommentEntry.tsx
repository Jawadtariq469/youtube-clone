import { Avatar } from '../../elements';
import {
  formatPublishedAt,
  formatViewCount,
} from '../../../utils/videoFormatters';
import { AvatarSize } from '../../../utils/enums';

import {
  CommentActionText,
  CommentActions,
  CommentAuthorName,
  CommentAuthorRow,
  CommentContent,
  CommentEntryContainer,
  CommentPublishedAt,
  CommentText,
} from './comment.styles';

import type { CommentEntryProps } from './types';

const CommentEntry = ({ entry, variant = 'comment' }: CommentEntryProps) => {
  const isReply = variant === 'reply';

  return (
    <CommentEntryContainer $isReply={isReply}>
      <Avatar
        name={entry.authorName}
        label={`${entry.authorName} avatar`}
        src={entry.authorAvatarUrl}
        size={isReply ? AvatarSize.Small : AvatarSize.Medium}
      />

      <CommentContent>
        <CommentAuthorRow>
          <CommentAuthorName>{entry.authorName}</CommentAuthorName>

          <CommentPublishedAt>
            {formatPublishedAt(entry.publishedAt)}
          </CommentPublishedAt>
        </CommentAuthorRow>

        <CommentText>{entry.text}</CommentText>

        <CommentActions>
          <CommentActionText
            aria-label={`${entry.likeCount} ${
              isReply ? 'reply' : 'comment'
            } likes`}
          >
            <span aria-hidden="true">👍</span>

            {entry.likeCount > 0 && formatViewCount(entry.likeCount)}
          </CommentActionText>
        </CommentActions>
      </CommentContent>
    </CommentEntryContainer>
  );
};

export default CommentEntry;
