import type { RootState } from '../store';

export const selectWatchLaterState = (state: RootState) => state.watchLater;

export const selectWatchLaterVideos = (state: RootState) =>
  state.watchLater.items;

export const selectIsWatchLaterLoading = (state: RootState) =>
  state.watchLater.isLoading;

export const selectWatchLaterError = (state: RootState) =>
  state.watchLater.error;
