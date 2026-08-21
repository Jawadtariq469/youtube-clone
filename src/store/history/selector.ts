import type { RootState } from '../store';

export const selectHistoryState = (state: RootState) => state.history;

export const selectHistoryItems = (state: RootState) => state.history.items;

export const selectIsHistoryLoading = (state: RootState) =>
  state.history.isLoading;

export const selectHistoryError = (state: RootState) => state.history.error;

export const selectIsHistoryPaused = (state: RootState) =>
  state.history.isPaused;
