export const InputSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type TInputSize = (typeof InputSize)[keyof typeof InputSize];
export const InputHtmlType = {
  Search: 'search',
} as const;
