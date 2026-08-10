import { useDispatch, useSelector } from 'react-redux';

import { setThemeMode, toggleSidebar, toggleTheme } from './action';

import {
  selectActiveTheme,
  selectIsSidebarOpen,
  selectThemeMode,
} from './selector';
import type { TypedUseSelectorHook } from 'react-redux';

import type { AppDispatch, RootState } from '../store';

import type { ThemeMode } from '../../utils/enums';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTheme = () => {
  const dispatch = useAppDispatch();

  const mode = useAppSelector(selectThemeMode);
  const theme = useAppSelector(selectActiveTheme);

  const setMode = (newMode: ThemeMode) => {
    dispatch(setThemeMode(newMode));
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
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
