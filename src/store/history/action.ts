import { createAction } from '@reduxjs/toolkit';

import type { WatchHistoryItem } from '../../utils/types';

export const historyLoadingStarted = createAction('history/loadingStarted');

export const historyLoaded = createAction<WatchHistoryItem[]>('history/loaded');

export const historyReset = createAction('history/reset');

export const historyMutationStarted = createAction('history/mutationStarted');

export const historyMutationFinished = createAction('history/mutationFinished');

export const historyRequestFailed = createAction<string>(
  'history/requestFailed',
);

export const historyErrorCleared = createAction('history/errorCleared');
