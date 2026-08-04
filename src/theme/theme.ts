import { darkColors } from "./darkColors";
import { lightColors } from "./lightColors";
import { ThemeMode } from "../utils/enums";

export const THEME_STORAGE_KEY = "youtube-clone-theme";

export const font = {
  family: {
    primary: '"Roboto", "Arial", sans-serif',
    secondary: '"Arial", sans-serif',
    monospace: '"Roboto Mono", monospace',
  },

  size: {
    xxs: "10px",
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    xxl: "24px",
    xxxl: "32px",
    displaySm: "36px",
    displayMd: "48px",
    displayLg: "64px",
  },

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

export const spacing = {
  none: "0px",
  xxs: "2px",
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  xxl: "24px",
  xxxl: "32px",
  section: "40px",
  page: "64px",
} as const;

export const radius = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  xxl: "24px",
  round: "9999px",
  circle: "50%",
} as const;

export const border = {
  width: {
    none: "0px",
    thin: "1px",
    medium: "2px",
    thick: "3px",
  },
} as const;

export const icon = {
  size: {
    xs: "14px",
    sm: "18px",
    md: "24px",
    lg: "28px",
    xl: "32px",
    xxl: "40px",
  },
} as const;

export const button = {
  size: {
    xs: {
      height: "28px",
      paddingX: spacing.sm,
      fontSize: font.size.xs,
      iconSize: icon.size.xs,
      gap: spacing.xs,
    },

    sm: {
      height: "32px",
      paddingX: spacing.md,
      fontSize: font.size.sm,
      iconSize: icon.size.sm,
      gap: spacing.sm,
    },

    md: {
      height: "40px",
      paddingX: spacing.lg,
      fontSize: font.size.sm,
      iconSize: icon.size.md,
      gap: spacing.sm,
    },

    lg: {
      height: "48px",
      paddingX: spacing.xl,
      fontSize: font.size.md,
      iconSize: icon.size.lg,
      gap: spacing.md,
    },

    xl: {
      height: "56px",
      paddingX: spacing.xxl,
      fontSize: font.size.lg,
      iconSize: icon.size.xl,
      gap: spacing.md,
    },
  },

  radius: {
    square: radius.md,
    rounded: radius.round,
    circle: radius.circle,
  },
} as const;

export const input = {
  size: {
    sm: {
      height: "32px",
      paddingX: spacing.md,
      fontSize: font.size.sm,
    },

    md: {
      height: "40px",
      paddingX: spacing.lg,
      fontSize: font.size.md,
    },

    lg: {
      height: "48px",
      paddingX: spacing.xl,
      fontSize: font.size.md,
    },
  },

  radius: radius.round,
} as const;

export const avatar = {
  size: {
    xs: "24px",
    sm: "32px",
    md: "40px",
    lg: "48px",
    xl: "64px",
    xxl: "96px",
  },
} as const;

export const header = {
  height: {
    mobile: "56px",
    desktop: "56px",
  },

  logoWidth: {
    mobile: "90px",
    desktop: "120px",
  },

  searchWidth: {
    min: "240px",
    max: "640px",
  },
} as const;

export const sidebar = {
  width: {
    collapsed: "72px",
    expanded: "240px",
    mobile: "280px",
  },

  itemHeight: {
    compact: "40px",
    regular: "48px",
  },
} as const;

export const video = {
  thumbnail: {
    aspectRatio: "16 / 9",
    minWidth: "240px",
    radius: radius.lg,
  },

  card: {
    minWidth: "240px",
    maxWidth: "420px",
    gap: spacing.md,
  },

  player: {
    aspectRatio: "16 / 9",
    minHeight: "240px",
    maxHeight: "720px",
  },

  progressBar: {
    height: "3px",
    hoverHeight: "5px",
  },
} as const;

export const layout = {
  contentMaxWidth: "1800px",

  pagePadding: {
    mobile: spacing.md,
    tablet: spacing.lg,
    desktop: spacing.xxl,
  },

  gridGap: {
    row: spacing.xxxl,
    column: spacing.lg,
  },
} as const;

export const breakpoint = {
  xs: 360,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

export const transition = {
  duration: {
    instant: "100ms",
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
    slower: "500ms",
  },

  timing: {
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
  },
} as const;

export const zIndex = {
  base: 0,
  video: 10,
  content: 20,
  sidebar: 100,
  header: 200,
  dropdown: 300,
  overlay: 400,
  modal: 500,
  tooltip: 600,
  toast: 700,
} as const;

const createShadow = (shadowColor: string) => ({
  xs: `0 1px 2px ${shadowColor}`,
  sm: `0 2px 6px ${shadowColor}`,
  md: `0 4px 12px ${shadowColor}`,
  lg: `0 8px 24px ${shadowColor}`,
  xl: `0 16px 40px ${shadowColor}`,
});

const sharedTheme = {
  font,
  spacing,
  radius,
  border,
  icon,
  button,
  input,
  avatar,
  header,
  sidebar,
  video,
  layout,
  breakpoint,
  transition,
  zIndex,
} as const;

export const lightTheme = {
  mode: ThemeMode.Light,
  colors: lightColors,
  shadow: createShadow(lightColors.overlay.shadow),
  ...sharedTheme,
} as const;

export const darkTheme = {
  mode: ThemeMode.Dark,
  colors: darkColors,
  shadow: createShadow(darkColors.overlay.shadow),
  ...sharedTheme,
} as const;

export const themes = {
  [ThemeMode.Light]: lightTheme,
  [ThemeMode.Dark]: darkTheme,
} as const;

export type AppTheme =
  (typeof themes)[keyof typeof themes];


