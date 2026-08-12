import { createReducer } from '@reduxjs/toolkit';

import {
  historyErrorCleared,
  historyLoaded,
  historyLoadingStarted,
  historyMutationFinished,
  historyMutationStarted,
  historyRequestFailed,
  historyReset,
} from './action';

import type { HistoryState } from './types';

const initialHistoryState: HistoryState = {
  items: [],

  isLoading: true,
  isInitialized: false,
  isMutating: false,

  error: null,
};

const historyReducer = createReducer(initialHistoryState, (builder) => {
  builder
    .addCase(historyLoadingStarted, (state) => {
      state.items = [];

      state.isLoading = true;
      state.isInitialized = false;

      state.error = null;
    })

    .addCase(historyLoaded, (state, action) => {
      state.items = action.payload;

      state.isLoading = false;
      state.isInitialized = true;

      state.error = null;
    })

    .addCase(historyReset, () => ({
      ...initialHistoryState,

      items: [],
      isLoading: false,
      isInitialized: true,
    }))

    .addCase(historyMutationStarted, (state) => {
      state.isMutating = true;
      state.error = null;
    })

    .addCase(historyMutationFinished, (state) => {
      state.isMutating = false;
    })

    .addCase(historyRequestFailed, (state, action) => {
      state.isLoading = false;
      state.isInitialized = true;
      state.isMutating = false;

      state.error = action.payload;
    })

    .addCase(historyErrorCleared, (state) => {
      state.error = null;
    });
});

export default historyReducer;
