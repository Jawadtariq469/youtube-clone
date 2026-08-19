import type { RootState } from '../store';

export const selectDownloadsState = (state: RootState) => state.downloads;

export const selectDownloadedVideos = (state: RootState) =>
  state.downloads.items;
