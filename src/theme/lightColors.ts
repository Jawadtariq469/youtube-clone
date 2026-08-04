import { blue, common, gray, green, overlay, red, yellow } from "./color";

export const lightColors = {
  brand: {
    primary: red.red3,
    primaryHover: red.red4,
    primaryActive: red.red5,
  },

  background: {
    page: gray.gray1,
    surface: gray.gray2,
    elevated: common.white,
    secondary: gray.gray3,
    hover: overlay.overlay1,
    active: gray.gray4,
    input: common.white,
    menu: common.white,
    tooltip: gray.gray10,
    video: common.black,
  },

  text: {
    primary: gray.gray10,
    secondary: gray.gray8,
    muted: gray.gray7,
    inverse: common.white,
    disabled: gray.gray6,
    link: blue.blue3,
  },

  icon: {
    primary: gray.gray10,
    secondary: gray.gray8,
    inverse: common.white,
    disabled: gray.gray6,
  },

  border: {
    default: gray.gray4,
    subtle: gray.gray3,
    strong: gray.gray5,
    focus: blue.blue3,
  },

  button: {
    primaryBackground: gray.gray10,
    primaryText: common.white,
    primaryHover: gray.gray9,

    secondaryBackground: gray.gray3,
    secondaryText: gray.gray10,
    secondaryHover: gray.gray4,

    dangerBackground: red.red3,
    dangerText: common.white,
    dangerHover: red.red4,

    disabledBackground: gray.gray4,
    disabledText: gray.gray6,
  },

  chip: {
    background: gray.gray3,
    text: gray.gray10,
    hover: gray.gray4,
    selectedBackground: gray.gray10,
    selectedText: common.white,
  },

  navigation: {
    background: common.white,
    text: gray.gray10,
    hover: gray.gray3,
    active: gray.gray4,
    activeText: gray.gray10,
  },

  input: {
    background: common.white,
    text: gray.gray10,
    placeholder: gray.gray7,
    border: gray.gray5,
    focusBorder: blue.blue3,
  },

  state: {
    success: green.green4,
    successBackground: green.green1,

    warning: yellow.yellow4,
    warningBackground: yellow.yellow1,

    error: red.red4,
    errorBackground: red.red1,

    info: blue.blue3,
    infoBackground: blue.blue1,
  },

  skeleton: {
    base: gray.gray4,
    highlight: gray.gray2,
  },

  scrollbar: {
    track: common.transparent,
    thumb: gray.gray6,
    thumbHover: gray.gray7,
  },

  overlay: {
    soft: overlay.overlay4,
    backdrop: overlay.overlay6,
    shadow: overlay.overlay3,
  },

  progress: {
    track: gray.gray5,
    value: red.red3,
  },
} as const;

/*
This derives the complete theme color contract from
the actual lightColors object.
*/
export type TColor = {
  [Group in keyof typeof lightColors]: {
    [ColorKey in keyof (typeof lightColors)[Group]]: string;
  };
};
