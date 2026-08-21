import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './history/reducer';
import { globalReducer } from './global/reducer';
import authReducer from './auth/reducer';
import { subscriptionsReducer } from './subscriptions';
import downloadsReducer from './downloads/reducer';
import { persistDownloadedVideos } from './downloads/storage';
import { likedVideosReducer } from './likedVideos';
import { watchLaterReducer } from './watchLater';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    history: historyReducer,
    subscriptions: subscriptionsReducer,
    downloads: downloadsReducer,
    likedVideos: likedVideosReducer,
    watchLater: watchLaterReducer,
  },
});

let previousDownloadedVideos = store.getState().downloads.items;

store.subscribe(() => {
  const downloadedVideos = store.getState().downloads.items;

  if (downloadedVideos === previousDownloadedVideos) {
    return;
  }

  previousDownloadedVideos = downloadedVideos;

  persistDownloadedVideos(downloadedVideos);
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
