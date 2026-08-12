import { createAction } from '@reduxjs/toolkit';

import type { AuthUser } from './types';

export const authRequestStarted = createAction('auth/requestStarted');

export const authStateChanged = createAction<AuthUser | null>(
  'auth/stateChanged',
);

export const authRequestFailed = createAction<string>('auth/requestFailed');

export const authErrorCleared = createAction('auth/errorCleared');
