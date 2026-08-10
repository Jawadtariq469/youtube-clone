import styled from 'styled-components';

import type { AppTheme } from '../../../theme';
import type { TInputSize } from '../../../utils/enums';

interface StyledSearchInputProps {
  $appTheme: AppTheme;
  $size: TInputSize;
  $isFullWidth: boolean;
  $hasEndButton: boolean;
}

export const StyledSearchInput = styled.input<StyledSearchInputProps>`
  box-sizing: border-box;
  min-width: 0;

  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};

  height: ${({ $appTheme, $size }) => $appTheme.input.size[$size].height};

  padding-inline: ${({ $appTheme, $size }) =>
    $appTheme.input.size[$size].paddingX};

  color: ${({ $appTheme }) => $appTheme.colors.input.text};

  background-color: ${({ $appTheme }) => $appTheme.colors.input.background};

  border: ${({ $appTheme }) => $appTheme.border.width.thin} solid
    ${({ $appTheme }) => $appTheme.colors.input.border};

  border-radius: ${({ $appTheme, $hasEndButton }) =>
    $hasEndButton
      ? `${$appTheme.input.radius} 0 0 ${$appTheme.input.radius}`
      : $appTheme.input.radius};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  font-size: ${({ $appTheme, $size }) => $appTheme.input.size[$size].fontSize};

  line-height: ${({ $appTheme }) => $appTheme.font.lineHeight.normal};

  outline: none;

  transition:
    color ${({ $appTheme }) => $appTheme.transition.duration.fast}
      ${({ $appTheme }) => $appTheme.transition.timing.easeInOut},
    background-color ${({ $appTheme }) => $appTheme.transition.duration.fast}
      ${({ $appTheme }) => $appTheme.transition.timing.easeInOut},
    border-color ${({ $appTheme }) => $appTheme.transition.duration.fast}
      ${({ $appTheme }) => $appTheme.transition.timing.easeInOut};

  &::placeholder {
    color: ${({ $appTheme }) => $appTheme.colors.input.placeholder};
  }

  &:hover:not(:disabled) {
    border-color: ${({ $appTheme }) => $appTheme.colors.border.strong};
  }

  &:focus {
    border-color: ${({ $appTheme }) => $appTheme.colors.input.focusBorder};

    box-shadow: 0 0 0 1px
      ${({ $appTheme }) => $appTheme.colors.input.focusBorder};
  }

  &:disabled {
    color: ${({ $appTheme }) => $appTheme.colors.text.disabled};

    background-color: ${({ $appTheme }) =>
      $appTheme.colors.background.secondary};

    cursor: not-allowed;
    opacity: 0.7;
  }

  &::-webkit-search-cancel-button {
    cursor: pointer;
  }
`;
