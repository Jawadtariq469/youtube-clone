export const ButtonVariant = {
  Primary: 'primary',
  Secondary: 'secondary',
  Danger: 'danger',
} as const;

export type ButtonVariantType =
  (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = {
  ExtraSmall: 'xs',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
} as const;

export type ButtonSizeType = (typeof ButtonSize)[keyof typeof ButtonSize];

export const ButtonHtmlType = {
  Button: 'button',
  Submit: 'submit',
  Reset: 'reset',
} as const;

export type TButtonHtmlType =
  (typeof ButtonHtmlType)[keyof typeof ButtonHtmlType];
