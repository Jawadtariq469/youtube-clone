import type { RootState } from '../store';

export const selectLikedVideosState = (state: RootState) => state.likedVideos;

export const selectLikedVideos = (state: RootState) => state.likedVideos.items;

export const selectIsLikedVideosLoading = (state: RootState) =>
  state.likedVideos.isLoading;

export const selectLikedVideosError = (state: RootState) =>
  state.likedVideos.error;
