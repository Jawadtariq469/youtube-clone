import { createReducer } from '@reduxjs/toolkit';

import {
  downloadedVideoRemoved,
  downloadsCleared,
  videoDownloaded,
} from './action';
import { readDownloadedVideos } from './storage';

import type { DownloadsState } from './types';

const initialDownloadsState: DownloadsState = {
  items: readDownloadedVideos(),
};

const downloadsReducer = createReducer(initialDownloadsState, (builder) => {
  builder
    .addCase(videoDownloaded, (state, action) => {
      const videoIsAlreadyDownloaded = state.items.some(
        (downloadedVideo) => downloadedVideo.id === action.payload.id,
      );

      if (videoIsAlreadyDownloaded) {
        return;
      }

      state.items.unshift(action.payload);
    })
    .addCase(downloadedVideoRemoved, (state, action) => {
      state.items = state.items.filter(
        (downloadedVideo) => downloadedVideo.id !== action.payload,
      );
    })
    .addCase(downloadsCleared, (state) => {
      state.items = [];
    });
});

export default downloadsReducer;
