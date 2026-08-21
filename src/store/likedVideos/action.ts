import { createAction } from '@reduxjs/toolkit';

import type { LikedVideo } from '../../utils/types';

import type {
  LikedVideoMutationFailurePayload,
  LikedVideoMutationPayload,
} from './types';

export const likedVideosLoadingStarted = createAction(
  'likedVideos/loadingStarted',
);

export const likedVideosLoaded =
  createAction<LikedVideo[]>('likedVideos/loaded');

export const likedVideosReset = createAction('likedVideos/reset');

export const likedVideoMutationStarted =
  createAction<LikedVideoMutationPayload>('likedVideos/mutationStarted');

export const likedVideoMutationFinished = createAction<string>(
  'likedVideos/mutationFinished',
);

export const likedVideoMutationFailed =
  createAction<LikedVideoMutationFailurePayload>('likedVideos/mutationFailed');

export const likedVideosRequestFailed = createAction<string>(
  'likedVideos/requestFailed',
);

export const likedVideosErrorCleared = createAction('likedVideos/errorCleared');
