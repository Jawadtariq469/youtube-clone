import { useTheme } from '../../../store/global';
import { ButtonHtmlType, IconButtonSize } from '../../../utils/enums';

import { StyledIconButton } from './iconButton.styles';

import type { IconButtonProps } from './types';

const IconButton = ({
  icon,
  label,
  size = IconButtonSize.Medium,
  htmlType = ButtonHtmlType.Button,
  isActive = false,
  ...buttonProps
}: IconButtonProps) => {
  const { theme } = useTheme();

  return (
    <StyledIconButton
      {...buttonProps}
      type={htmlType}
      aria-label={label}
      $appTheme={theme}
      $size={size}
      $isActive={isActive}
    >
      {icon}
    </StyledIconButton>
  );
};

export default IconButton;
