import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

import {
  setThemeMode as setThemeModeAction,
  toggleTheme as toggleThemeAction,
} from "./action";
import {
  selectActiveTheme,
  selectThemeMode,
} from "./selector";

import type { ThemeMode } from "../../utils/enums";
export const useTheme = () => {
  const dispatch = useAppDispatch();

  const mode = useAppSelector(selectThemeMode);
  const theme = useAppSelector(selectActiveTheme);

  const setMode = (newMode: ThemeMode) => {
    dispatch(setThemeModeAction(newMode));
  };

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  return {
    mode,
    theme,
    setMode,
    toggleTheme,
  };
};