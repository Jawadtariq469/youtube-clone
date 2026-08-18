import { Skeleton } from '../../components/elements';

import { useAuth } from '../../store/auth';
import { useTheme } from '../../store/global';
import { useSubscriptions } from '../../store/subscriptions';

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
  const { theme } = useTheme();
  const handleChannelSelect = (): void => {
    if (!video) {
      return;
    }

    onChannelSelect(video.channelId);
  };
  const { user, signInWithGoogle } = useAuth();

  const {
    isLoading: isSubscriptionsLoading,
    isMutating: isSubscriptionMutating,
    isSubscribed,
    toggleSubscription,
  } = useSubscriptions();

  const channelIsSubscribed = video ? isSubscribed(video.channelId) : false;

  const isSubscriptionButtonDisabled =
    Boolean(user) && (isSubscriptionsLoading || isSubscriptionMutating);

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
                <ChannelAvatarImage src={video.channelAvatarUrl} alt="" />
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
          <ActionButton type="button" $appTheme={theme}>
            👍 Like
          </ActionButton>

          <ActionButton type="button" $appTheme={theme}>
            Share
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
