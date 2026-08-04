import { themes } from "../../theme";

import type { RootState } from "../store";

export const selectThemeMode = (
  state: RootState,
) => {
  return state.global.themeMode;
};

export const selectActiveTheme = (
  state: RootState,
) => {
  return themes[state.global.themeMode];
};