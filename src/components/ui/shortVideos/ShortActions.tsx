import { useState } from 'react';
import { AppQueryParameters, AppRoutes } from '../../../constants';
import {
  CommentOutlineIcon,
  LikeOutlineIcon,
  ShareOutlineIcon,
  WatchLaterIcon,
} from '../../icons';

import { useAuth } from '../../../store/auth';
import { useTheme } from '../../../store/global';

import { useLikedVideos } from '../../../store/likedVideos';

import { useWatchLater } from '../../../store/watchLater';

import {
  ShortActionButton,
  ShortActionIcon,
  ShortActionLabel,
  ShortActionsContainer,
} from './shortActions.styles';

import type { ShortActionsProps } from './types';

const ShortActions = ({ video, onOpenWatch }: ShortActionsProps) => {
  const [shareButtonLabel, setShareButtonLabel] = useState('Share');

  const { user, isLoading: isAuthLoading, signInWithGoogle } = useAuth();

  const {
    isLoading: isLikedVideosLoading,
    isLiked,
    isLikeMutating,
    toggleLike,
  } = useLikedVideos();

  const {
    isLoading: isWatchLaterLoading,
    isInWatchLater,
    isWatchLaterMutating,
    toggleWatchLater,
  } = useWatchLater();

  const { theme } = useTheme();

  const videoIsLiked = isLiked(video.id);

  const videoIsInWatchLater = isInWatchLater(video.id);

  const isLikeSaving = isLikeMutating(video.id);

  const isWatchLaterSaving = isWatchLaterMutating(video.id);

  const isLikeButtonDisabled =
    isAuthLoading || (Boolean(user) && (isLikedVideosLoading || isLikeSaving));

  const isWatchLaterButtonDisabled =
    isAuthLoading ||
    (Boolean(user) && (isWatchLaterLoading || isWatchLaterSaving));

  const handleLikeToggle = (): void => {
    if (isLikeButtonDisabled) {
      return;
    }

    if (!user) {
      void signInWithGoogle();

      return;
    }

    void toggleLike(video);
  };

  const handleComments = (): void => {
    onOpenWatch(video.id);
  };

  const handleWatchLaterToggle = (): void => {
    if (isWatchLaterButtonDisabled) {
      return;
    }

    if (!user) {
      void signInWithGoogle();

      return;
    }

    void toggleWatchLater(video);
  };

  const handleShare = async (): Promise<void> => {
    const searchParameters = new URLSearchParams({
      [AppQueryParameters.VideoId]: video.id,
    });

    const shortUrl =
      `${window.location.origin}` +
      `${AppRoutes.Shorts}?` +
      searchParameters.toString();

    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: `Watch ${video.title}`,
          url: shortUrl,
        });

        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shortUrl);

        setShareButtonLabel('Copied');

        return;
      }

      window.prompt('Copy this Short link:', shortUrl);
    } catch {
      /*
       * Closing the share dialog
       * is not an application error.
       */
    }
  };

  const likeButtonLabel = isLikeSaving
    ? 'Saving...'
    : videoIsLiked
      ? 'Liked'
      : 'Like';

  const watchLaterButtonLabel = isWatchLaterSaving
    ? 'Saving...'
    : videoIsInWatchLater
      ? 'Saved'
      : 'Watch later';

  return (
    <ShortActionsContainer>
      <ShortActionButton
        type="button"
        $appTheme={theme}
        $isActive={videoIsLiked}
        disabled={isLikeButtonDisabled}
        aria-label={
          videoIsLiked ? 'Remove Short from liked videos' : 'Like Short'
        }
        aria-pressed={videoIsLiked}
        onClick={handleLikeToggle}
      >
        <ShortActionIcon $appTheme={theme} $isActive={videoIsLiked}>
          <LikeOutlineIcon fill={videoIsLiked ? 'currentColor' : 'none'} />
        </ShortActionIcon>

        <ShortActionLabel>{likeButtonLabel}</ShortActionLabel>
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
        $isActive={videoIsInWatchLater}
        disabled={isWatchLaterButtonDisabled}
        aria-label={
          videoIsInWatchLater
            ? 'Remove Short from Watch Later'
            : 'Save Short to Watch Later'
        }
        aria-pressed={videoIsInWatchLater}
        onClick={handleWatchLaterToggle}
      >
        <ShortActionIcon $appTheme={theme} $isActive={videoIsInWatchLater}>
          <WatchLaterIcon />
        </ShortActionIcon>

        <ShortActionLabel>{watchLaterButtonLabel}</ShortActionLabel>
      </ShortActionButton>

      <ShortActionButton
        type="button"
        $appTheme={theme}
        $isActive={false}
        aria-label="Share Short"
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
