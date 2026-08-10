import styled from 'styled-components';

import type { AppTheme } from '../../../theme';
import type { IconButtonSizeType } from '../../../utils/enums';

interface StyledIconButtonProps {
  $appTheme: AppTheme;
  $size: IconButtonSizeType;
  $isActive: boolean;
}

export const StyledIconButton = styled.button<StyledIconButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: ${({ $appTheme, $size }) => $appTheme.button.size[$size].height};

  height: ${({ $appTheme, $size }) => $appTheme.button.size[$size].height};

  padding: 0;
  border: none;

  border-radius: ${({ $appTheme }) => $appTheme.radius.circle};

  color: ${({ $appTheme }) => $appTheme.colors.icon.primary};

  background-color: ${({ $appTheme, $isActive }) =>
    $isActive ? $appTheme.colors.background.active : 'transparent'};

  cursor: pointer;

  transition:
    color ${({ $appTheme }) => $appTheme.transition.duration.fast}
      ${({ $appTheme }) => $appTheme.transition.timing.easeInOut},
    background-color ${({ $appTheme }) => $appTheme.transition.duration.fast}
      ${({ $appTheme }) => $appTheme.transition.timing.easeInOut};

  &:hover:not(:disabled) {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.hover};
  }

  &:focus-visible {
    outline: ${({ $appTheme }) => $appTheme.border.width.medium} solid
      ${({ $appTheme }) => $appTheme.colors.border.focus};

    outline-offset: 2px;
  }

  &:disabled {
    color: ${({ $appTheme }) => $appTheme.colors.icon.disabled};

    background-color: ${({ $appTheme }) =>
      $appTheme.colors.button.disabledBackground};

    cursor: not-allowed;
    opacity: 0.7;
  }

  svg {
    width: ${({ $appTheme, $size }) => $appTheme.button.size[$size].iconSize};

    height: ${({ $appTheme, $size }) => $appTheme.button.size[$size].iconSize};

    pointer-events: none;
  }
`;
