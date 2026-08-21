import { useMemo } from 'react';

import { Button } from '../../components/elements';

import { VideoGrid, VideoGridShimmer } from '../../components/ui';

import { useSubscriptionVideos } from '../../hooks/useSubscriptionVideos';

import { useAuth } from '../../store/auth';
import { useSubscriptions } from '../../store/subscriptions';

import { ButtonHtmlType, ButtonSize, ButtonVariant } from '../../utils/enums';

import {
  SubscriptionsHeader,
  SubscriptionsPage,
  SubscriptionsStatusMessage,
  SubscriptionsStatusPanel,
  SubscriptionsSubtitle,
  SubscriptionsTitle,
} from './subscriptionsView.styles';

import type { SubscriptionsViewProps } from './types';

const SubscriptionsView = ({ onVideoSelect }: SubscriptionsViewProps) => {
  const {
    user,
    isLoading: isAuthLoading,
    isInitialized: isAuthInitialized,
    signInWithGoogle,
  } = useAuth();

  const {
    items: subscriptions,

    isLoading: isSubscriptionsLoading,
    isInitialized: isSubscriptionsInitialized,

    error: subscriptionsError,
  } = useSubscriptions();

  const channelIds = useMemo(
    () => subscriptions.map((subscription) => subscription.channelId),
    [subscriptions],
  );

  const {
    data: videos = [],

    isPending: isVideosPending,
    isError: isVideosError,
    error: videosError,

    refetch,
  } = useSubscriptionVideos(channelIds);

  const handleSignIn = (): void => {
    if (isAuthLoading) {
      return;
    }

    void signInWithGoogle();
  };

  const handleRetry = (): void => {
    void refetch();
  };

  const channelCount = subscriptions.length;

  const shouldShowLoadingState =
    !isAuthInitialized ||
    (Boolean(user) && (isAuthLoading || !isSubscriptionsInitialized));

  if (shouldShowLoadingState) {
    return <VideoGridShimmer />;
  }

  if (!user) {
    return (
      <SubscriptionsPage>
        <SubscriptionsHeader>
          <SubscriptionsTitle>Subscriptions</SubscriptionsTitle>
        </SubscriptionsHeader>

        <SubscriptionsStatusPanel>
          <SubscriptionsStatusMessage>
            Sign in to subscribe to channels and view their recent videos.
          </SubscriptionsStatusMessage>

          <Button
            type={ButtonHtmlType.Button}
            variant={ButtonVariant.Primary}
            size={ButtonSize.Medium}
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </SubscriptionsStatusPanel>
      </SubscriptionsPage>
    );
  }

  return (
    <SubscriptionsPage>
      <SubscriptionsHeader>
        <SubscriptionsTitle>Subscriptions</SubscriptionsTitle>

        <SubscriptionsSubtitle>
          {channelCount}{' '}
          {channelCount === 1 ? 'subscribed channel' : 'subscribed channels'}
        </SubscriptionsSubtitle>
      </SubscriptionsHeader>

      {isSubscriptionsLoading && <VideoGridShimmer />}

      {!isSubscriptionsLoading && subscriptionsError && (
        <SubscriptionsStatusPanel>
          <SubscriptionsStatusMessage role="alert">
            {subscriptionsError}
          </SubscriptionsStatusMessage>
        </SubscriptionsStatusPanel>
      )}

      {!isSubscriptionsLoading &&
        !subscriptionsError &&
        subscriptions.length === 0 && (
          <SubscriptionsStatusPanel>
            <SubscriptionsStatusMessage>
              Channels you subscribe to will appear here.
            </SubscriptionsStatusMessage>
          </SubscriptionsStatusPanel>
        )}

      {!isSubscriptionsLoading &&
        !subscriptionsError &&
        subscriptions.length > 0 &&
        isVideosPending && <VideoGridShimmer />}

      {!isSubscriptionsLoading &&
        !subscriptionsError &&
        subscriptions.length > 0 &&
        !isVideosPending &&
        isVideosError && (
          <SubscriptionsStatusPanel>
            <SubscriptionsStatusMessage role="alert">
              Failed to load subscription videos:{' '}
              {videosError instanceof Error
                ? videosError.message
                : 'Unknown error'}
            </SubscriptionsStatusMessage>

            <Button
              type={ButtonHtmlType.Button}
              variant={ButtonVariant.Secondary}
              size={ButtonSize.Medium}
              onClick={handleRetry}
            >
              Try again
            </Button>
          </SubscriptionsStatusPanel>
        )}

      {!isSubscriptionsLoading &&
        !subscriptionsError &&
        subscriptions.length > 0 &&
        !isVideosPending &&
        !isVideosError &&
        videos.length === 0 && (
          <SubscriptionsStatusPanel>
            <SubscriptionsStatusMessage>
              No recent videos are available from your subscribed channels.
            </SubscriptionsStatusMessage>
          </SubscriptionsStatusPanel>
        )}

      {!isSubscriptionsLoading &&
        !subscriptionsError &&
        !isVideosPending &&
        !isVideosError &&
        videos.length > 0 && (
          <VideoGrid videos={videos} onVideoSelect={onVideoSelect} />
        )}
    </SubscriptionsPage>
  );
};

export default SubscriptionsView;
