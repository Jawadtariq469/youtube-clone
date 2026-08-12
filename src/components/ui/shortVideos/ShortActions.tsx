import { useState } from 'react';

import {
  CommentOutlineIcon,
  LikeOutlineIcon,
  ShareOutlineIcon,
} from '../../icons';

import { useTheme } from '../../../store/global';

import {
  ShortActionButton,
  ShortActionIcon,
  ShortActionLabel,
  ShortActionsContainer,
} from './shortActions.styles';

import type { ShortActionsProps } from './types';

const ShortActions = ({ video, onOpenWatch }: ShortActionsProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const [shareButtonLabel, setShareButtonLabel] = useState('Share');

  const { theme } = useTheme();

  const handleLike = (): void => {
    setIsLiked((currentValue) => !currentValue);
  };

  const handleComments = (): void => {
    onOpenWatch(video.id);
  };

  const handleShare = async (): Promise<void> => {
    const shortUrl = `https://www.youtube.com/shorts/` + video.id;

    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          url: shortUrl,
        });

        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shortUrl);

        setShareButtonLabel('Copied');
      }
    } catch {
      /*
       * The user may cancel the
       * operating system share dialog.
       */
    }
  };

  return (
    <ShortActionsContainer>
      <ShortActionButton
        type="button"
        $appTheme={theme}
        $isActive={isLiked}
        aria-label={isLiked ? 'Unlike video' : 'Like video'}
        aria-pressed={isLiked}
        onClick={handleLike}
      >
        <ShortActionIcon $appTheme={theme} $isActive={isLiked}>
          <LikeOutlineIcon />
        </ShortActionIcon>

        <ShortActionLabel>{isLiked ? 'Liked' : 'Like'}</ShortActionLabel>
      </ShortActionButton>

      <ShortActionButton
        type="button"
        $appTheme={theme}
        $isActive={false}
        aria-label="Open comments"
        onClick={handleComments}
      >
        <ShortActionIcon $appTheme={theme} $isActive={false}>
          <CommentOutlineIcon />
        </ShortActionIcon>

        <ShortActionLabel>Comments</ShortActionLabel>
      </ShortActionButton>

      <ShortActionButton
        type="button"
        $appTheme={theme}
        $isActive={false}
        aria-label="Share video"
        onClick={() => {
          void handleShare();
        }}
      >
        <ShortActionIcon $appTheme={theme} $isActive={false}>
          <ShareOutlineIcon />
        </ShortActionIcon>

        <ShortActionLabel>{shareButtonLabel}</ShortActionLabel>
      </ShortActionButton>
    </ShortActionsContainer>
  );
};

export default ShortActions;
