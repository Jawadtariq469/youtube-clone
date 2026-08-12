import { configureStore } from '@reduxjs/toolkit';

import { globalReducer } from './global/reducer';
import authReducer from './auth/reducer';
export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
