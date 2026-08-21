import { useState } from 'react';

import { Skeleton } from '../../components/elements';

import {
  DownloadIcon,
  LikeOutlineIcon,
  ShareOutlineIcon,
  WatchLaterIcon,
} from '../../components/icons';

import { useAuth } from '../../store/auth';
import { useDownloads } from '../../store/downloads';
import { useTheme } from '../../store/global';
import { useLikedVideos } from '../../store/likedVideos';
import { useSubscriptions } from '../../store/subscriptions';
import { useWatchLater } from '../../store/watchLater';

import {
  formatPublishedDate,
  formatViewCount,
} from '../../utils/videoFormatters';

import ExpandableDescription from './ExpandableDescription';

import {
  ActionButton,
  ActionButtons,
  ChannelActions,
  ChannelAvatar,
  ChannelAvatarImage,
  ChannelInformation,
  ChannelInitial,
  ChannelTitle,
  DescriptionBox,
  DescriptionMetadata,
  LoadingChannel,
  LoadingInformation,
  StatusMessage,
  SubscribeButton,
  VideoActionsRow,
  VideoTitle,
  WatchInformation as WatchInformationContainer,
} from './watchView.styles';

import type { WatchInformationProps } from './types';

const WatchInformation = ({
  video,
  isLoading,
  isError,
  error,
  onChannelSelect,
}: WatchInformationProps) => {
  const [copiedVideoId, setCopiedVideoId] = useState<string | null>(null);

  const { theme } = useTheme();

  const { user, signInWithGoogle } = useAuth();

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

  const { downloadVideo, isDownloaded, removeDownload } = useDownloads();

  const {
    isLoading: isSubscriptionsLoading,
    isMutating: isSubscriptionMutating,
    isSubscribed,
    toggleSubscription,
  } = useSubscriptions();

  const channelIsSubscribed = video ? isSubscribed(video.channelId) : false;

  const videoIsDownloaded = video ? isDownloaded(video.id) : false;

  const videoIsLiked = video ? isLiked(video.id) : false;

  const videoIsInWatchLater = video ? isInWatchLater(video.id) : false;

  const isWatchLaterButtonMutating = video
    ? isWatchLaterMutating(video.id)
    : false;

  const isWatchLaterButtonDisabled =
    Boolean(user) && (isWatchLaterLoading || isWatchLaterButtonMutating);

  const isLikeButtonMutating = video ? isLikeMutating(video.id) : false;

  const isLikeButtonDisabled =
    Boolean(user) && (isLikedVideosLoading || isLikeButtonMutating);

  const isSubscriptionButtonDisabled =
    Boolean(user) && (isSubscriptionsLoading || isSubscriptionMutating);

  const handleChannelSelect = (): void => {
    if (!video) {
      return;
    }

    onChannelSelect(video.channelId);
  };

  const handleSubscriptionToggle = (): void => {
    if (!video) {
      return;
    }

    if (!user) {
      void signInWithGoogle();

      return;
    }

    void toggleSubscription(video);
  };

  const handleDownloadToggle = (): void => {
    if (!video) {
      return;
    }

    if (videoIsDownloaded) {
      removeDownload(video.id);

      return;
    }

    downloadVideo(video);
  };

  const handleLikeToggle = (): void => {
    if (!video) {
      return;
    }

    if (!user) {
      void signInWithGoogle();

      return;
    }

    void toggleLike(video);
  };

  const handleWatchLaterToggle = (): void => {
    if (!video) {
      return;
    }

    if (!user) {
      void signInWithGoogle();

      return;
    }

    void toggleWatchLater(video);
  };

  const handleShare = async (): Promise<void> => {
    if (!video) {
      return;
    }

    /*
     * This is the current page from
     * your own website, including
     * the selected video ID.
     */
    const videoUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: `Watch ${video.title}`,
          url: videoUrl,
        });

        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(videoUrl);

        setCopiedVideoId(video.id);

        return;
      }

      window.prompt('Copy this video link:', videoUrl);
    } catch {
      /*
       * The user may cancel the
       * operating-system share dialog.
       */
    }
  };

  if (isLoading) {
    return (
      <LoadingInformation
        aria-label="Loading video information"
        aria-busy="true"
      >
        <Skeleton width="85%" height="22px" />

        <LoadingChannel>
          <Skeleton width="40px" height="40px" borderRadius="50%" />

          <Skeleton width="160px" height="15px" />
        </LoadingChannel>

        <Skeleton width="100%" height="100px" borderRadius="12px" />
      </LoadingInformation>
    );
  }

  if (isError) {
    return (
      <StatusMessage>
        Failed to load video information:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </StatusMessage>
    );
  }

  if (!video) {
    return <StatusMessage>This video could not be found.</StatusMessage>;
  }

  const subscriptionButtonText =
    isSubscriptionsLoading && user
      ? 'Loading...'
      : isSubscriptionMutating
        ? 'Updating...'
        : channelIsSubscribed
          ? 'Subscribed'
          : 'Subscribe';

  const shareButtonText = copiedVideoId === video.id ? 'Copied' : 'Share';

  return (
    <WatchInformationContainer>
      <VideoTitle>{video.title}</VideoTitle>

      <VideoActionsRow>
        <ChannelActions>
          <ChannelInformation
            type="button"
            $appTheme={theme}
            aria-label={`Open ${video.channelTitle} channel`}
            onClick={handleChannelSelect}
          >
            <ChannelAvatar>
              {video.channelAvatarUrl ? (
                <ChannelAvatarImage
                  src={video.channelAvatarUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                />
              ) : (
                <ChannelInitial>
                  {video.channelTitle.trim().charAt(0) || '?'}
                </ChannelInitial>
              )}
            </ChannelAvatar>

            <ChannelTitle>{video.channelTitle}</ChannelTitle>
          </ChannelInformation>

          <SubscribeButton
            type="button"
            $appTheme={theme}
            $isSubscribed={channelIsSubscribed}
            disabled={isSubscriptionButtonDisabled}
            aria-pressed={channelIsSubscribed}
            aria-label={
              channelIsSubscribed
                ? `Unsubscribe from ${video.channelTitle}`
                : `Subscribe to ${video.channelTitle}`
            }
            onClick={handleSubscriptionToggle}
          >
            {subscriptionButtonText}
          </SubscribeButton>
        </ChannelActions>

        <ActionButtons>
          <ActionButton
            type="button"
            $appTheme={theme}
            $isActive={videoIsLiked}
            disabled={isLikeButtonDisabled}
            aria-pressed={videoIsLiked}
            aria-label={
              videoIsLiked ? 'Remove video from liked videos' : 'Like video'
            }
            onClick={handleLikeToggle}
          >
            <LikeOutlineIcon fill={videoIsLiked ? 'currentColor' : 'none'} />

            {isLikeButtonMutating
              ? 'Saving...'
              : videoIsLiked
                ? 'Liked'
                : 'Like'}
          </ActionButton>

          <ActionButton
            type="button"
            $appTheme={theme}
            aria-label={`Share ${video.title}`}
            onClick={() => {
              void handleShare();
            }}
          >
            <ShareOutlineIcon />

            {shareButtonText}
          </ActionButton>

          <ActionButton
            type="button"
            $appTheme={theme}
            $isActive={videoIsInWatchLater}
            disabled={isWatchLaterButtonDisabled}
            aria-pressed={videoIsInWatchLater}
            aria-label={
              videoIsInWatchLater
                ? 'Remove video from Watch Later'
                : 'Save video to Watch Later'
            }
            onClick={handleWatchLaterToggle}
          >
            <WatchLaterIcon />

            {isWatchLaterButtonMutating
              ? 'Saving...'
              : videoIsInWatchLater
                ? 'Saved'
                : 'Watch later'}
          </ActionButton>

          <ActionButton
            type="button"
            $appTheme={theme}
            $isActive={videoIsDownloaded}
            aria-pressed={videoIsDownloaded}
            aria-label={
              videoIsDownloaded
                ? 'Remove video from downloads'
                : 'Download video'
            }
            onClick={handleDownloadToggle}
          >
            <DownloadIcon />

            {videoIsDownloaded ? 'Downloaded' : 'Download'}
          </ActionButton>

          <ActionButton
            type="button"
            $appTheme={theme}
            aria-label="More actions"
          >
            •••
          </ActionButton>
        </ActionButtons>
      </VideoActionsRow>

      <DescriptionBox $appTheme={theme}>
        <DescriptionMetadata>
          {formatViewCount(video.viewCount)} views
          {' • '}
          {formatPublishedDate(video.publishedAt)}
        </DescriptionMetadata>

        {video.description && (
          <ExpandableDescription
            key={video.id}
            description={video.description}
          />
        )}
      </DescriptionBox>
    </WatchInformationContainer>
  );
};

export default WatchInformation;
