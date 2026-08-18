import type { RootState } from '../store';

export const selectSubscriptionsState = (state: RootState) =>
  state.subscriptions;

export const selectSubscriptions = (state: RootState) =>
  state.subscriptions.items;

export const selectIsSubscriptionsLoading = (state: RootState) =>
  state.subscriptions.isLoading;

export const selectSubscriptionsError = (state: RootState) =>
  state.subscriptions.error;
