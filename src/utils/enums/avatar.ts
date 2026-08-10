export const AvatarSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type TAvatarSize = (typeof AvatarSize)[keyof typeof AvatarSize];
