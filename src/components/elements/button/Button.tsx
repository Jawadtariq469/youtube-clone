import {
  ButtonHtmlType,
  ButtonSize,
  ButtonVariant,
} from '../../../utils/enums';
import { useTheme } from '../../../store/global';

import { StyledButton } from './button.styles';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonSizeType, ButtonVariantType } from '../../../utils/enums';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  isFullWidth?: boolean;
}

const Button = ({
  children,
  variant = ButtonVariant.Primary,
  size = ButtonSize.Medium,
  type = ButtonHtmlType.Button,
  isFullWidth = false,
  ...buttonProps
}: ButtonProps) => {
  const { theme } = useTheme();

  return (
    <StyledButton
      {...buttonProps}
      type={type}
      $appTheme={theme}
      $variant={variant}
      $size={size}
      $isFullWidth={isFullWidth}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
