export const common = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const gray = {
  gray1: '#ffffff',
  gray2: '#f9f9f9',
  gray3: '#f2f2f2',
  gray4: '#e5e5e5',
  gray5: '#d3d3d3',
  gray6: '#aaaaaa',
  gray7: '#717171',
  gray8: '#606060',
  gray9: '#3f3f3f',
  gray10: '#0f0f0f',
} as const;

export const darkGray = {
  gray1: '#0f0f0f',
  gray2: '#181818',
  gray3: '#212121',
  gray4: '#272727',
  gray5: '#3f3f3f',
  gray6: '#606060',
  gray7: '#aaaaaa',
  gray8: '#d3d3d3',
  gray9: '#f2f2f2',
  gray10: '#ffffff',
} satisfies Record<keyof typeof gray, string>;

export const red = {
  red1: '#ffe5e5',
  red2: '#ff4e45',
  red3: '#ff0000',
  red4: '#cc0000',
  red5: '#b00000',
} as const;

export const darkRed = {
  red1: '#3d1515',
  red2: '#ff6b63',
  red3: '#ff0000',
  red4: '#ff4e45',
  red5: '#cc0000',
} satisfies Record<keyof typeof red, string>;

export const blue = {
  blue1: '#dbeafe',
  blue2: '#3ea6ff',
  blue3: '#065fd4',
  blue4: '#0b57d0',
  blue5: '#003f91',
} as const;

export const darkBlue = {
  blue1: '#102a43',
  blue2: '#6ab7ff',
  blue3: '#3ea6ff',
  blue4: '#65b8ff',
  blue5: '#8acaff',
} satisfies Record<keyof typeof blue, string>;

export const green = {
  green1: '#dcfce7',
  green2: '#4ade80',
  green3: '#16a34a',
  green4: '#15803d',
} as const;

export const darkGreen = {
  green1: '#143322',
  green2: '#86efac',
  green3: '#4ade80',
  green4: '#22c55e',
} satisfies Record<keyof typeof green, string>;

export const yellow = {
  yellow1: '#fef3c7',
  yellow2: '#facc15',
  yellow3: '#eab308',
  yellow4: '#ca8a04',
} as const;

export const darkYellow = {
  yellow1: '#3b3010',
  yellow2: '#fde047',
  yellow3: '#facc15',
  yellow4: '#eab308',
} satisfies Record<keyof typeof yellow, string>;

export const overlay = {
  overlay1: 'rgba(0, 0, 0, 0.04)',
  overlay2: 'rgba(0, 0, 0, 0.08)',
  overlay3: 'rgba(0, 0, 0, 0.12)',
  overlay4: 'rgba(0, 0, 0, 0.20)',
  overlay5: 'rgba(0, 0, 0, 0.40)',
  overlay6: 'rgba(0, 0, 0, 0.70)',
} as const;

export const darkOverlay = {
  overlay1: 'rgba(255, 255, 255, 0.04)',
  overlay2: 'rgba(255, 255, 255, 0.08)',
  overlay3: 'rgba(255, 255, 255, 0.12)',
  overlay4: 'rgba(0, 0, 0, 0.40)',
  overlay5: 'rgba(0, 0, 0, 0.60)',
  overlay6: 'rgba(0, 0, 0, 0.80)',
} satisfies Record<keyof typeof overlay, string>;
