import { createReducer } from '@reduxjs/toolkit';

import {
  likedVideoMutationFailed,
  likedVideoMutationFinished,
  likedVideoMutationStarted,
  likedVideosErrorCleared,
  likedVideosLoaded,
  likedVideosLoadingStarted,
  likedVideosRequestFailed,
  likedVideosReset,
} from './action';

import type { LikedVideo } from '../../utils/types';
import type { LikedVideosState } from './types';

const initialLikedVideosState: LikedVideosState = {
  items: [],

  isLoading: true,
  isInitialized: false,

  pendingVideoIds: [],

  error: null,
};

const sortLikedVideos = (likedVideos: LikedVideo[]): void => {
  likedVideos.sort((firstVideo, secondVideo) => {
    const firstLikedTime = Date.parse(firstVideo.likedAt) || 0;

    const secondLikedTime = Date.parse(secondVideo.likedAt) || 0;

    return secondLikedTime - firstLikedTime;
  });
};

const likedVideosReducer = createReducer(initialLikedVideosState, (builder) => {
  builder
    .addCase(likedVideosLoadingStarted, (state) => {
      state.items = [];

      state.isLoading = true;
      state.isInitialized = false;

      state.pendingVideoIds = [];

      state.error = null;
    })

    .addCase(likedVideosLoaded, (state, action) => {
      state.items = action.payload;

      state.isLoading = false;
      state.isInitialized = true;

      state.error = null;
    })

    .addCase(likedVideosReset, () => ({
      ...initialLikedVideosState,

      items: [],
      isLoading: false,
      isInitialized: false,
      pendingVideoIds: [],
    }))

    .addCase(likedVideoMutationStarted, (state, action) => {
      const { video, wasLiked } = action.payload;

      if (!state.pendingVideoIds.includes(video.id)) {
        state.pendingVideoIds.push(video.id);
      }

      if (wasLiked) {
        state.items = state.items.filter(
          (likedVideo) => likedVideo.id !== video.id,
        );
      } else if (
        !state.items.some((likedVideo) => likedVideo.id === video.id)
      ) {
        state.items.unshift(video);
      }

      state.error = null;
    })

    .addCase(likedVideoMutationFinished, (state, action) => {
      state.pendingVideoIds = state.pendingVideoIds.filter(
        (videoId) => videoId !== action.payload,
      );
    })

    .addCase(likedVideoMutationFailed, (state, action) => {
      const { video, wasLiked, error } = action.payload;

      state.pendingVideoIds = state.pendingVideoIds.filter(
        (videoId) => videoId !== video.id,
      );

      if (wasLiked) {
        const videoAlreadyExists = state.items.some(
          (likedVideo) => likedVideo.id === video.id,
        );

        if (!videoAlreadyExists) {
          state.items.push(video);

          sortLikedVideos(state.items);
        }
      } else {
        state.items = state.items.filter(
          (likedVideo) => likedVideo.id !== video.id,
        );
      }

      state.error = error;
    })

    .addCase(likedVideosRequestFailed, (state, action) => {
      state.isLoading = false;
      state.isInitialized = true;

      state.error = action.payload;
    })

    .addCase(likedVideosErrorCleared, (state) => {
      state.error = null;
    });
});

export default likedVideosReducer;
