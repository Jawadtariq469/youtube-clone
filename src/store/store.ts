import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './history/reducer';
import { globalReducer } from './global/reducer';
import authReducer from './auth/reducer';
export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
