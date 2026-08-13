import { useDispatch, useSelector } from 'react-redux';

import { setThemeMode, toggleSidebar, toggleTheme } from './action';

import {
  selectActiveTheme,
  selectIsSidebarOpen,
  selectThemeMode,
} from './selector';
import type { TypedUseSelectorHook } from 'react-redux';

import type { AppDispatch, RootState } from '../store';

import { ThemeMode } from '../../utils/enums';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTheme = () => {
  const THEME_STORAGE_KEY = 'youtube-clone-theme';
  const THEME_CHANGING_CLASS = 'theme-changing';
  const dispatch = useAppDispatch();

  const mode = useAppSelector(selectThemeMode);
  const theme = useAppSelector(selectActiveTheme);

  const setMode = (newMode: ThemeMode): void => {
    localStorage.setItem(THEME_STORAGE_KEY, newMode);

    dispatch(setThemeMode(newMode));
  };

  const handleToggleTheme = (): void => {
    const nextMode =
      mode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;

    document.documentElement.classList.add(THEME_CHANGING_CLASS);

    localStorage.setItem(THEME_STORAGE_KEY, nextMode);

    dispatch(toggleTheme());

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.documentElement.classList.remove(THEME_CHANGING_CLASS);
      });
    });
  };
  return {
    mode,
    theme,
    setMode,
    toggleTheme: handleToggleTheme,
  };
};
export const useSidebar = () => {
  const dispatch = useAppDispatch();

  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return {
    isSidebarOpen,
    toggleSidebar: handleToggleSidebar,
  };
};
