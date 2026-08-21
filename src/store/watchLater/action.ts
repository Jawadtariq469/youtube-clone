import { createAction } from '@reduxjs/toolkit';

import type { WatchLaterVideo } from '../../utils/types';

import type {
  WatchLaterMutationFailurePayload,
  WatchLaterMutationPayload,
} from './types';

export const watchLaterLoadingStarted = createAction(
  'watchLater/loadingStarted',
);

export const watchLaterLoaded =
  createAction<WatchLaterVideo[]>('watchLater/loaded');

export const watchLaterReset = createAction('watchLater/reset');

export const watchLaterMutationStarted =
  createAction<WatchLaterMutationPayload>('watchLater/mutationStarted');

export const watchLaterMutationFinished = createAction<string>(
  'watchLater/mutationFinished',
);

export const watchLaterMutationFailed =
  createAction<WatchLaterMutationFailurePayload>('watchLater/mutationFailed');

export const watchLaterRequestFailed = createAction<string>(
  'watchLater/requestFailed',
);

export const watchLaterErrorCleared = createAction('watchLater/errorCleared');
