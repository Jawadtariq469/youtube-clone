import { createReducer } from '@reduxjs/toolkit';

import { ThemeMode } from '../../utils/enums';

import { setThemeMode, toggleSidebar, toggleTheme } from './action';

import type { GlobalState } from './types';

const THEME_STORAGE_KEY = 'youtube-clone-theme';

const getInitialThemeMode = (): ThemeMode => {
  const savedThemeMode = localStorage.getItem(THEME_STORAGE_KEY);

  return savedThemeMode === ThemeMode.Dark ? ThemeMode.Dark : ThemeMode.Light;
};

const initialState: GlobalState = {
  mode: getInitialThemeMode(),
  isSidebarOpen: true,
};

export const globalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setThemeMode, (state, action) => {
      state.mode = action.payload;
    })
    .addCase(toggleTheme, (state) => {
      state.mode =
        state.mode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
    })
    .addCase(toggleSidebar, (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    });
});
