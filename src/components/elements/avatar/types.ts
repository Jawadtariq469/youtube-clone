import type { ButtonHTMLAttributes } from 'react';

import type { TAvatarSize } from '../../../utils/enums';

export interface AvatarProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'type' | 'aria-label'
> {
  name: string;
  label: string;
  src?: string;
  size?: TAvatarSize;
}

export interface StyledAvatarProps {
  $size: TAvatarSize;
}
