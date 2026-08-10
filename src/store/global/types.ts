import type { ThemeMode } from '../../utils/enums/themeMode';

export interface GlobalState {
  mode: ThemeMode;

  isSidebarOpen: boolean;
}
