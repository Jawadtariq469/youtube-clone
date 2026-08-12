import {
  ButtonHtmlType,
  ButtonSize,
  ButtonVariant,
} from '../../../utils/enums';
import { useTheme } from '../../../store/global';

import { StyledButton } from './button.styles';

import type { ButtonProps } from './types';

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
