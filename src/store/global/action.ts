import { createAction } from "@reduxjs/toolkit";

import type { ThemeMode } from "../../utils/enums";

export const setThemeMode = createAction<ThemeMode>(
  "global/setThemeMode",
);

export const toggleTheme = createAction(
  "global/toggleTheme",
);