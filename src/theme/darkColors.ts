import {
  common,
  darkBlue,
  darkGray,
  darkGreen,
  darkOverlay,
  darkRed,
  darkYellow,
} from "./color";

import type { TColor } from "./lightColors";

export const darkColors = {
  brand: {
    primary: darkRed.red3,
    primaryHover: darkRed.red2,
    primaryActive: darkRed.red4,
  },

  background: {
    page: darkGray.gray1,
    surface: darkGray.gray2,
    elevated: darkGray.gray3,
    secondary: darkGray.gray4,
    hover: darkOverlay.overlay2,
    active: darkGray.gray5,
    input: darkGray.gray2,
    menu: darkGray.gray3,
    tooltip: darkGray.gray9,
    video: common.black,
  },

  text: {
    primary: darkGray.gray10,
    secondary: darkGray.gray8,
    muted: darkGray.gray7,
    inverse: darkGray.gray1,
    disabled: darkGray.gray6,
    link: darkBlue.blue3,
  },

  icon: {
    primary: darkGray.gray10,
    secondary: darkGray.gray8,
    inverse: darkGray.gray1,
    disabled: darkGray.gray6,
  },

  border: {
    default: darkGray.gray5,
    subtle: darkGray.gray4,
    strong: darkGray.gray6,
    focus: darkBlue.blue3,
  },

  button: {
    primaryBackground: darkGray.gray10,
    primaryText: darkGray.gray1,
    primaryHover: darkGray.gray9,

    secondaryBackground: darkGray.gray4,
    secondaryText: darkGray.gray10,
    secondaryHover: darkGray.gray5,

    dangerBackground: darkRed.red3,
    dangerText: common.white,
    dangerHover: darkRed.red2,

    disabledBackground: darkGray.gray4,
    disabledText: darkGray.gray6,
  },

  chip: {
    background: darkGray.gray4,
    text: darkGray.gray10,
    hover: darkGray.gray5,
    selectedBackground: darkGray.gray10,
    selectedText: darkGray.gray1,
  },

  navigation: {
    background: darkGray.gray1,
    text: darkGray.gray10,
    hover: darkGray.gray4,
    active: darkGray.gray5,
    activeText: darkGray.gray10,
  },

  input: {
    background: darkGray.gray2,
    text: darkGray.gray10,
    placeholder: darkGray.gray7,
    border: darkGray.gray5,
    focusBorder: darkBlue.blue3,
  },

  state: {
    success: darkGreen.green3,
    successBackground: darkGreen.green1,

    warning: darkYellow.yellow3,
    warningBackground: darkYellow.yellow1,

    error: darkRed.red2,
    errorBackground: darkRed.red1,

    info: darkBlue.blue3,
    infoBackground: darkBlue.blue1,
  },

  skeleton: {
    base: darkGray.gray4,
    highlight: darkGray.gray5,
  },

  scrollbar: {
    track: common.transparent,
    thumb: darkGray.gray6,
    thumbHover: darkGray.gray7,
  },

  overlay: {
    soft: darkOverlay.overlay4,
    backdrop: darkOverlay.overlay6,
    shadow: darkOverlay.overlay5,
  },

  progress: {
    track: darkGray.gray5,
    value: darkRed.red3,
  },
} satisfies TColor;
