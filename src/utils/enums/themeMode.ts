export const ThemeMode = {
  Light: "light",
  Dark: "dark",
} as const;

export type ThemeMode =
  (typeof ThemeMode)[keyof typeof ThemeMode];

export const THEME_STORAGE_KEY =
  "youtube-clone-theme";