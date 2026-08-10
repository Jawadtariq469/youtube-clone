import styled, { css } from 'styled-components';

import { ButtonVariant } from '../../../utils/enums';

import type { AppTheme } from '../../../theme';
import type { ButtonSizeType, ButtonVariantType } from '../../../utils/enums';

interface StyledButtonProps {
  $appTheme: AppTheme;
  $variant: ButtonVariantType;
  $size: ButtonSizeType;
  $isFullWidth: boolean;
}

const getVariantStyles = (theme: AppTheme, variant: ButtonVariantType) => {
  const colors = theme.colors.button;

  switch (variant) {
    case ButtonVariant.Secondary:
      return css`
        color: ${colors.secondaryText};
        background-color: ${colors.secondaryBackground};

        &:hover:not(:disabled) {
          background-color: ${colors.secondaryHover};
        }
      `;

    case ButtonVariant.Danger:
      return css`
        color: ${colors.dangerText};
        background-color: ${colors.dangerBackground};

        &:hover:not(:disabled) {
          background-color: ${colors.dangerHover};
        }
      `;

    case ButtonVariant.Primary:
    default:
      return css`
        color: ${colors.primaryText};
        background-color: ${colors.primaryBackground};

        &:hover:not(:disabled) {
          background-color: ${colors.primaryHover};
        }
      `;
  }
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};

  height: ${({ $appTheme, $size }) => $appTheme.button.size[$size].height};

  padding-inline: ${({ $appTheme, $size }) =>
    $appTheme.button.size[$size].paddingX};

  gap: ${({ $appTheme, $size }) => $appTheme.button.size[$size].gap};

  border: none;

  border-radius: ${({ $appTheme }) => $appTheme.button.radius.rounded};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  font-size: ${({ $appTheme, $size }) => $appTheme.button.size[$size].fontSize};

  font-weight: ${({ $appTheme }) => $appTheme.font.weight.medium};

  line-height: ${({ $appTheme }) => $appTheme.font.lineHeight.normal};

  white-space: nowrap;
  cursor: pointer;
  user-select: none;

  transition:
    background-color ${({ $appTheme }) => $appTheme.transition.duration.fast}
      ${({ $appTheme }) => $appTheme.transition.timing.easeInOut},
    color ${({ $appTheme }) => $appTheme.transition.duration.fast}
      ${({ $appTheme }) => $appTheme.transition.timing.easeInOut},
    opacity ${({ $appTheme }) => $appTheme.transition.duration.fast}
      ${({ $appTheme }) => $appTheme.transition.timing.easeInOut};

  ${({ $appTheme, $variant }) => getVariantStyles($appTheme, $variant)}

  &:focus-visible {
    outline: ${({ $appTheme }) => $appTheme.border.width.medium} solid
      ${({ $appTheme }) => $appTheme.colors.border.focus};

    outline-offset: 2px;
  }

  &:disabled {
    color: ${({ $appTheme }) => $appTheme.colors.button.disabledText};

    background-color: ${({ $appTheme }) =>
      $appTheme.colors.button.disabledBackground};

    cursor: not-allowed;
    opacity: 0.7;
  }
  svg {
    width: ${({ $appTheme, $size }) => $appTheme.button.size[$size].iconSize};

    height: ${({ $appTheme, $size }) => $appTheme.button.size[$size].iconSize};

    flex-shrink: 0;
    pointer-events: none;
  }
`;
