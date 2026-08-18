import type { ChannelDetails } from '../../../utils/types';

export interface ChannelHeaderProps {
  channel: ChannelDetails;

  isSubscribed: boolean;
  isUpdatingSubscription?: boolean;

  onSubscriptionToggle: () => void;
}
