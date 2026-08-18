import { Button } from '../../elements';

import {
  ButtonHtmlType,
  ButtonSize,
  ButtonVariant,
} from '../../../utils/enums';

import { formatViewCount } from '../../../utils/videoFormatters';

import {
  ChannelActionContainer,
  ChannelAvatar,
  ChannelAvatarImage,
  ChannelBanner,
  ChannelBannerImage,
  ChannelDescription,
  ChannelHeaderContainer,
  ChannelMetadata,
  ChannelName,
  ChannelSummary,
  ChannelTextContent,
} from './channelHeader.styles';

import type { ChannelHeaderProps } from './types';

const ChannelHeader = ({
  channel,
  isSubscribed,
  isUpdatingSubscription = false,
  onSubscriptionToggle,
}: ChannelHeaderProps) => {
  const channelInitial =
    channel.channelTitle.trim().charAt(0).toLocaleUpperCase() || '?';

  const channelHandle = channel.customUrl ?? channel.channelId;

  const subscriberText =
    channel.subscriberCount === undefined
      ? null
      : `${formatViewCount(channel.subscriberCount)} subscribers`;

  const videoText = `${formatViewCount(channel.videoCount)} videos`;

  return (
    <ChannelHeaderContainer>
      <ChannelBanner>
        {channel.bannerUrl && (
          <ChannelBannerImage src={channel.bannerUrl} alt="" />
        )}
      </ChannelBanner>

      <ChannelSummary>
        <ChannelAvatar>
          {channel.channelAvatarUrl ? (
            <ChannelAvatarImage
              src={channel.channelAvatarUrl}
              alt={`${channel.channelTitle} channel`}
            />
          ) : (
            channelInitial
          )}
        </ChannelAvatar>

        <ChannelTextContent>
          <ChannelName>{channel.channelTitle}</ChannelName>

          <ChannelMetadata>
            {channelHandle}

            {subscriberText && ` • ${subscriberText}`}

            {` • ${videoText}`}
          </ChannelMetadata>

          {channel.description && (
            <ChannelDescription>{channel.description}</ChannelDescription>
          )}
        </ChannelTextContent>

        <ChannelActionContainer>
          <Button
            type={ButtonHtmlType.Button}
            variant={
              isSubscribed ? ButtonVariant.Secondary : ButtonVariant.Primary
            }
            size={ButtonSize.Medium}
            disabled={isUpdatingSubscription}
            aria-pressed={isSubscribed}
            onClick={onSubscriptionToggle}
          >
            {isUpdatingSubscription
              ? 'Updating...'
              : isSubscribed
                ? 'Subscribed'
                : 'Subscribe'}
          </Button>
        </ChannelActionContainer>
      </ChannelSummary>
    </ChannelHeaderContainer>
  );
};

export default ChannelHeader;
