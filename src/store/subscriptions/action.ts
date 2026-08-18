import { createAction } from '@reduxjs/toolkit';

import type { ChannelSubscription } from '../../utils/types';

export const subscriptionsLoadingStarted = createAction(
  'subscriptions/loadingStarted',
);

export const subscriptionsLoaded = createAction<ChannelSubscription[]>(
  'subscriptions/loaded',
);

export const subscriptionsReset = createAction('subscriptions/reset');

export const subscriptionMutationStarted = createAction(
  'subscriptions/mutationStarted',
);

export const subscriptionMutationFinished = createAction(
  'subscriptions/mutationFinished',
);

export const subscriptionsRequestFailed = createAction<string>(
  'subscriptions/requestFailed',
);

export const subscriptionsErrorCleared = createAction(
  'subscriptions/errorCleared',
);
