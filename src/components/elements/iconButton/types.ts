import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { TButtonHtmlType, ButtonSizeType } from '../../../utils/enums';

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'type' | 'aria-label'
> {
  icon: ReactNode;
  label: string;
  size?: ButtonSizeType;
  htmlType?: TButtonHtmlType;
  isActive?: boolean;
}
