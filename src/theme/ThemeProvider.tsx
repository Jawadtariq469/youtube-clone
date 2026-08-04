import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { themes } from "./theme";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { AppTheme, ThemeMode } from "./theme";

interface ThemeContextValue {
  mode: ThemeMode;
  theme: AppTheme;
  setMode: Dispatch<SetStateAction<ThemeMode>>;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = "youtube-clone-theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getInitialMode = (): ThemeMode => {
  const savedMode = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedMode === "light" || savedMode === "dark") {
    return savedMode;
  }

  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  return prefersDarkMode ? "dark" : "light";
};

const toKebabCase = (value: string) => {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};

const applyColorVariables = (
  element: HTMLElement,
  values: object,
  path: string[] = [],
): void => {
  Object.entries(values).forEach(([key, value]) => {
    const currentPath = [...path, toKebabCase(key)];

    if (typeof value === "string") {
      const variableName = `--color-${currentPath.join("-")}`;

      element.style.setProperty(variableName, value);

      return;
    }

    if (typeof value === "object" && value !== null) {
      applyColorVariables(element, value, currentPath);
    }
  });
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  const theme = useMemo(() => {
    return themes[mode];
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((currentMode) => {
      return currentMode === "light" ? "dark" : "light";
    });
  }, []);

  useEffect(() => {
    const rootElement = document.documentElement;

    rootElement.dataset.theme = mode;
    rootElement.style.colorScheme = mode;

    applyColorVariables(rootElement, theme.colors);

    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode, theme]);

  const contextValue = useMemo(
    () => ({
      mode,
      theme,
      setMode,
      toggleTheme,
    }),
    [mode, theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
