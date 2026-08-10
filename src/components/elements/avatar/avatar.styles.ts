import styled from 'styled-components';

import type { AppTheme } from '../../../theme';
import type { StyledAvatarProps } from './types';

interface AvatarThemeProps extends StyledAvatarProps {
  $appTheme: AppTheme;
}

export const AvatarButton = styled.button<AvatarThemeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: ${({ $appTheme, $size }) => $appTheme.avatar.size[$size]};

  height: ${({ $appTheme, $size }) => $appTheme.avatar.size[$size]};

  padding: 0;
  overflow: hidden;

  border: none;

  border-radius: ${({ $appTheme }) => $appTheme.radius.circle};

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: ${({ $appTheme }) => $appTheme.colors.background.secondary};

  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: ${({ $appTheme }) => $appTheme.border.width.medium} solid
      ${({ $appTheme }) => $appTheme.colors.border.focus};

    outline-offset: 2px;
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarFallback = styled.span<AvatarThemeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  font-size: ${({ $appTheme }) => $appTheme.font.size.sm};

  font-weight: ${({ $appTheme }) => $appTheme.font.weight.medium};
`;
