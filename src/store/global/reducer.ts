import { createReducer } from '@reduxjs/toolkit';

import { ThemeMode } from '../../utils/enums';

import { setThemeMode, toggleSidebar, toggleTheme } from './action';

import type { GlobalState } from './types';

const initialState: GlobalState = {
  mode: ThemeMode.Light,
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
