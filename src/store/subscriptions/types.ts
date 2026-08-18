import type { ChannelSubscription } from '../../utils/types';

export interface SubscriptionsState {
  items: ChannelSubscription[];

  isLoading: boolean;
  isInitialized: boolean;
  isMutating: boolean;

  error: string | null;
}
