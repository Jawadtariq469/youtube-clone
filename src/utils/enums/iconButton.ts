export const IconButtonSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type IconButtonSizeType =
  (typeof IconButtonSize)[keyof typeof IconButtonSize];
