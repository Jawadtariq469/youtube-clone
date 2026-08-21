import { createReducer } from '@reduxjs/toolkit';

import {
  watchLaterErrorCleared,
  watchLaterLoaded,
  watchLaterLoadingStarted,
  watchLaterMutationFailed,
  watchLaterMutationFinished,
  watchLaterMutationStarted,
  watchLaterRequestFailed,
  watchLaterReset,
} from './action';

import type { WatchLaterVideo } from '../../utils/types';
import type { WatchLaterState } from './types';

const initialWatchLaterState: WatchLaterState = {
  items: [],

  isLoading: true,
  isInitialized: false,

  pendingVideoIds: [],

  error: null,
};

const sortWatchLaterVideos = (videos: WatchLaterVideo[]): void => {
  videos.sort((firstVideo, secondVideo) => {
    const firstSavedTime = Date.parse(firstVideo.savedAt) || 0;
    const secondSavedTime = Date.parse(secondVideo.savedAt) || 0;

    return secondSavedTime - firstSavedTime;
  });
};

const watchLaterReducer = createReducer(initialWatchLaterState, (builder) => {
  builder
    .addCase(watchLaterLoadingStarted, (state) => {
      state.items = [];

      state.isLoading = true;
      state.isInitialized = false;

      state.pendingVideoIds = [];

      state.error = null;
    })

    .addCase(watchLaterLoaded, (state, action) => {
      state.items = action.payload;

      state.isLoading = false;
      state.isInitialized = true;

      state.error = null;
    })

    .addCase(watchLaterReset, () => ({
      ...initialWatchLaterState,

      items: [],
      isLoading: false,
      isInitialized: false,
      pendingVideoIds: [],
    }))

    .addCase(watchLaterMutationStarted, (state, action) => {
      const { video, wasSaved } = action.payload;

      if (!state.pendingVideoIds.includes(video.id)) {
        state.pendingVideoIds.push(video.id);
      }

      if (wasSaved) {
        state.items = state.items.filter(
          (watchLaterVideo) => watchLaterVideo.id !== video.id,
        );
      } else if (
        !state.items.some((watchLaterVideo) => watchLaterVideo.id === video.id)
      ) {
        state.items.unshift(video);
      }

      state.error = null;
    })

    .addCase(watchLaterMutationFinished, (state, action) => {
      state.pendingVideoIds = state.pendingVideoIds.filter(
        (videoId) => videoId !== action.payload,
      );
    })

    .addCase(watchLaterMutationFailed, (state, action) => {
      const { video, wasSaved, error } = action.payload;

      state.pendingVideoIds = state.pendingVideoIds.filter(
        (videoId) => videoId !== video.id,
      );

      if (wasSaved) {
        if (
          !state.items.some(
            (watchLaterVideo) => watchLaterVideo.id === video.id,
          )
        ) {
          state.items.push(video);

          sortWatchLaterVideos(state.items);
        }
      } else {
        state.items = state.items.filter(
          (watchLaterVideo) => watchLaterVideo.id !== video.id,
        );
      }

      state.error = error;
    })

    .addCase(watchLaterRequestFailed, (state, action) => {
      state.isLoading = false;
      state.isInitialized = true;

      state.error = action.payload;
    })

    .addCase(watchLaterErrorCleared, (state) => {
      state.error = null;
    });
});

export default watchLaterReducer;
