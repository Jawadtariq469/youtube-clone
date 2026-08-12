import { createReducer } from '@reduxjs/toolkit';

import {
  authErrorCleared,
  authRequestFailed,
  authRequestStarted,
  authStateChanged,
} from './action';

import type { AuthState } from './types';

const initialAuthState: AuthState = {
  user: null,

  isLoading: true,
  isInitialized: false,

  error: null,
};

const authReducer = createReducer(initialAuthState, (builder) => {
  builder
    .addCase(authRequestStarted, (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase(authStateChanged, (state, action) => {
      state.user = action.payload;

      state.isLoading = false;
      state.isInitialized = true;

      state.error = null;
    })

    .addCase(authRequestFailed, (state, action) => {
      state.isLoading = false;
      state.isInitialized = true;

      state.error = action.payload;
    })

    .addCase(authErrorCleared, (state) => {
      state.error = null;
    });
});

export default authReducer;
