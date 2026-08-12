import styled from 'styled-components';

import type { AppTheme } from '../../../theme';

interface StyledTextAreaProps {
  $appTheme: AppTheme;
  $isFullWidth: boolean;
}

export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  display: block;

  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  min-height: 36px;
  max-height: 160px;

  padding: 8px 2px;

  border: none;
  border-bottom: 1px solid ${({ $appTheme }) => $appTheme.colors.input.border};

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};
  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  font-size: 14px;
  line-height: 1.4;

  overflow-y: auto;
  resize: none;

  &:focus {
    border-bottom-color: ${({ $appTheme }) => $appTheme.colors.text.primary};

    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.75;
  }
`;
