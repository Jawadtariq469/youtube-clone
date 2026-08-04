import { createReducer } from "@reduxjs/toolkit";

import { THEME_STORAGE_KEY, ThemeMode } from "../../utils/enums";
import { setThemeMode, toggleTheme } from "./action";

import type { GlobalState } from "./types";

const getInitialThemeMode = (): ThemeMode => {
  const savedThemeMode = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedThemeMode === ThemeMode.Light) {
    return ThemeMode.Light;
  }

  if (savedThemeMode === ThemeMode.Dark) {
    return ThemeMode.Dark;
  }

  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  return prefersDarkMode ? ThemeMode.Dark : ThemeMode.Light;
};

const initialState: GlobalState = {
  themeMode: getInitialThemeMode(),
};

const globalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setThemeMode, (state, action) => {
      state.themeMode = action.payload;
    })
    .addCase(toggleTheme, (state) => {
      state.themeMode =
        state.themeMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
    });
});

export default globalReducer;
