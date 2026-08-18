import { createReducer } from '@reduxjs/toolkit';

import {
  subscriptionMutationFinished,
  subscriptionMutationStarted,
  subscriptionsErrorCleared,
  subscriptionsLoaded,
  subscriptionsLoadingStarted,
  subscriptionsRequestFailed,
  subscriptionsReset,
} from './action';

import type { SubscriptionsState } from './types';

const initialSubscriptionsState: SubscriptionsState = {
  items: [],

  isLoading: true,
  isInitialized: false,
  isMutating: false,

  error: null,
};

const subscriptionsReducer = createReducer(
  initialSubscriptionsState,
  (builder) => {
    builder
      .addCase(subscriptionsLoadingStarted, (state) => {
        state.items = [];

        state.isLoading = true;
        state.isInitialized = false;

        state.error = null;
      })

      .addCase(subscriptionsLoaded, (state, action) => {
        state.items = action.payload;

        state.isLoading = false;
        state.isInitialized = true;

        state.error = null;
      })

      .addCase(subscriptionsReset, () => ({
        ...initialSubscriptionsState,

        items: [],
        isLoading: false,
        isInitialized: true,
      }))

      .addCase(subscriptionMutationStarted, (state) => {
        state.isMutating = true;
        state.error = null;
      })

      .addCase(subscriptionMutationFinished, (state) => {
        state.isMutating = false;
      })

      .addCase(subscriptionsRequestFailed, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.isMutating = false;

        state.error = action.payload;
      })

      .addCase(subscriptionsErrorCleared, (state) => {
        state.error = null;
      });
  },
);

export default subscriptionsReducer;
