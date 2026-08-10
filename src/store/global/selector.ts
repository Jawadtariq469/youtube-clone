import { themes } from '../../theme';

import type { RootState } from '../store';

export const selectThemeMode = (state: RootState) => state.global.mode;

export const selectActiveTheme = (state: RootState) =>
  themes[state.global.mode];

export const selectIsSidebarOpen = (state: RootState) =>
  state.global.isSidebarOpen;
