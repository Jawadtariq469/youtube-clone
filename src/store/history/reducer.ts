import { createReducer } from '@reduxjs/toolkit';

import {
  historyErrorCleared,
  historyLoaded,
  historyLoadingStarted,
  historyMutationFinished,
  historyMutationStarted,
  historyPauseChanged,
  historyRequestFailed,
  historyReset,
} from './action';
import { readIsHistoryPaused } from './storage';

import type { HistoryState } from './types';

const initialHistoryState: HistoryState = {
  items: [],

  isLoading: true,
  isInitialized: false,
  isMutating: false,
  isPaused: readIsHistoryPaused(),

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

    .addCase(historyReset, (state) => ({
      ...initialHistoryState,

      items: [],
      isLoading: false,

      /*
       * Signed-out history is not initialized
       * for any authenticated user.
       */
      isInitialized: false,

      isPaused: state.isPaused,
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
    })

    .addCase(historyPauseChanged, (state, action) => {
      state.isPaused = action.payload;
    });
});

export default historyReducer;
