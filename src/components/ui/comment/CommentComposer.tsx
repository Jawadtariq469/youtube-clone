import { useState } from 'react';

import { Avatar, Button, TextArea } from '../../elements';
import {
  AvatarSize,
  ButtonHtmlType,
  ButtonSize,
  ButtonVariant,
} from '../../../utils/enums';

import {
  CommentComposerActions,
  CommentComposerContainer,
  CommentComposerForm,
} from './comment.styles';

import type { ChangeEvent, FormEvent } from 'react';
import type { CommentComposerProps } from './types';

const MAX_COMMENT_LENGTH = 10_000;

const CommentComposer = ({
  user,
  isAuthLoading = false,
  onSignIn,
  onSubmit,
}: CommentComposerProps) => {
  const [commentText, setCommentText] = useState('');

  const [isComposerActive, setIsComposerActive] = useState(false);

  const normalizedComment = commentText.trim();

  const handleCommentChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!normalizedComment || !user) {
      return;
    }

    onSubmit(normalizedComment);

    setCommentText('');
    setIsComposerActive(false);
  };

  const handleCancel = (): void => {
    setCommentText('');
    setIsComposerActive(false);
  };

  if (!user) {
    return (
      <CommentComposerContainer>
        <Avatar
          name="Guest"
          label="Guest user avatar"
          size={AvatarSize.Medium}
        />

        <CommentComposerForm>
          <TextArea
            label="Sign in to add a comment"
            placeholder="Sign in to add a comment"
            rows={1}
            isFullWidth
            disabled
          />

          <CommentComposerActions>
            <Button
              type={ButtonHtmlType.Button}
              variant={ButtonVariant.Primary}
              size={ButtonSize.Small}
              disabled={isAuthLoading}
              onClick={onSignIn}
            >
              {isAuthLoading ? 'Checking account...' : 'Sign in'}
            </Button>
          </CommentComposerActions>
        </CommentComposerForm>
      </CommentComposerContainer>
    );
  }

  return (
    <CommentComposerContainer>
      <Avatar
        name={user.name}
        label={`${user.name}'s avatar`}
        src={user.avatarUrl ?? undefined}
        size={AvatarSize.Medium}
      />

      <CommentComposerForm onSubmit={handleCommentSubmit}>
        <TextArea
          label="Add a comment"
          placeholder="Add a comment..."
          value={commentText}
          rows={1}
          maxLength={MAX_COMMENT_LENGTH}
          isFullWidth
          onFocus={() => {
            setIsComposerActive(true);
          }}
          onChange={handleCommentChange}
        />

        {isComposerActive && (
          <CommentComposerActions>
            <Button
              type={ButtonHtmlType.Button}
              variant={ButtonVariant.Secondary}
              size={ButtonSize.Small}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              type={ButtonHtmlType.Submit}
              variant={ButtonVariant.Primary}
              size={ButtonSize.Small}
              disabled={!normalizedComment}
            >
              Comment
            </Button>
          </CommentComposerActions>
        )}
      </CommentComposerForm>
    </CommentComposerContainer>
  );
};

export default CommentComposer;
