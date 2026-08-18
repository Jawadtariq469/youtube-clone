import { useMemo } from 'react';

import { useParams } from 'react-router';

import {
  ChannelHeader,
  VideoGrid,
  VideoGridShimmer,
} from '../../components/ui';

import { useChannelDetails } from '../../hooks/useChannelDetails';

import { useSubscriptionVideos } from '../../hooks/useSubscriptionVideos';

import { useAuth } from '../../store/auth';

import { useSubscriptions } from '../../store/subscriptions';

import {
  ChannelPage,
  ChannelStatusMessage,
  ChannelStatusPanel,
  ChannelVideosHeading,
} from './channelView.styles';

import type { ChannelViewProps } from './types';

const ChannelView = ({ onVideoSelect }: ChannelViewProps) => {
  const { channelId = '' } = useParams<{
    channelId: string;
  }>();

  const { user, signInWithGoogle } = useAuth();

  const {
    isLoading: isSubscriptionsLoading,
    isMutating: isSubscriptionMutating,
    error: subscriptionsError,
    isSubscribed,
    toggleSubscription,
  } = useSubscriptions();

  const {
    data: channel,

    isPending: isChannelPending,
    isError: isChannelError,
    error: channelError,
  } = useChannelDetails(channelId);

  const channelIds = useMemo(
    () => (channel ? [channel.channelId] : []),
    [channel],
  );

  const {
    data: videos = [],

    isPending: isVideosPending,
    isError: isVideosError,
    error: videosError,
  } = useSubscriptionVideos(channelIds);

  const channelIsSubscribed = channel ? isSubscribed(channel.channelId) : false;

  const isSubscriptionButtonDisabled =
    Boolean(user) && (isSubscriptionsLoading || isSubscriptionMutating);

  const handleSubscriptionToggle = (): void => {
    if (!channel) {
      return;
    }

    if (!user) {
      void signInWithGoogle();

      return;
    }

    void toggleSubscription(channel);
  };

  if (!channelId) {
    return (
      <ChannelStatusMessage>No channel was selected.</ChannelStatusMessage>
    );
  }

  if (isChannelPending) {
    return (
      <ChannelPage>
        <VideoGridShimmer itemCount={6} />
      </ChannelPage>
    );
  }

  if (isChannelError) {
    return (
      <ChannelStatusPanel>
        <ChannelStatusMessage role="alert">
          Failed to load channel:{' '}
          {channelError instanceof Error
            ? channelError.message
            : 'Unknown error'}
        </ChannelStatusMessage>
      </ChannelStatusPanel>
    );
  }

  if (!channel) {
    return (
      <ChannelStatusPanel>
        <ChannelStatusMessage>
          This channel could not be found.
        </ChannelStatusMessage>
      </ChannelStatusPanel>
    );
  }

  return (
    <ChannelPage>
      <ChannelHeader
        channel={channel}
        isSubscribed={channelIsSubscribed}
        isUpdatingSubscription={isSubscriptionButtonDisabled}
        onSubscriptionToggle={handleSubscriptionToggle}
      />

      {subscriptionsError && (
        <ChannelStatusMessage role="alert">
          {subscriptionsError}
        </ChannelStatusMessage>
      )}

      <ChannelVideosHeading>Latest videos</ChannelVideosHeading>

      {isVideosPending && <VideoGridShimmer itemCount={6} />}

      {!isVideosPending && isVideosError && (
        <ChannelStatusPanel>
          <ChannelStatusMessage role="alert">
            Failed to load channel videos:{' '}
            {videosError instanceof Error
              ? videosError.message
              : 'Unknown error'}
          </ChannelStatusMessage>
        </ChannelStatusPanel>
      )}

      {!isVideosPending && !isVideosError && videos.length === 0 && (
        <ChannelStatusPanel>
          <ChannelStatusMessage>
            This channel has no available videos.
          </ChannelStatusMessage>
        </ChannelStatusPanel>
      )}

      {!isVideosPending && !isVideosError && videos.length > 0 && (
        <VideoGrid videos={videos} onVideoSelect={onVideoSelect} />
      )}
    </ChannelPage>
  );
};

export default ChannelView;
