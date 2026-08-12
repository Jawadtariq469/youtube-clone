import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { ButtonSizeType, ButtonVariantType } from '../../../utils/enums';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  isFullWidth?: boolean;
}
