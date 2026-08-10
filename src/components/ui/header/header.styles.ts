import styled from 'styled-components';

import type { HeaderThemeProps } from './types';

export const HeaderContainer = styled.header<HeaderThemeProps>`
  position: sticky;
  top: 0;
  z-index: ${({ $appTheme }) => $appTheme.zIndex.header};

  display: flex;
  align-items: center;

  width: 100%;
  height: ${({ $appTheme }) => $appTheme.header.height.desktop};

  padding-inline: ${({ $appTheme }) => $appTheme.spacing.lg};

  gap: ${({ $appTheme }) => $appTheme.spacing.md};

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: ${({ $appTheme }) => $appTheme.colors.background.page};

  border-bottom: ${({ $appTheme }) => $appTheme.border.width.thin} solid
    ${({ $appTheme }) => $appTheme.colors.border.subtle};

  box-sizing: border-box;
`;

export const HeaderLeft = styled.div<HeaderThemeProps>`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  gap: ${({ $appTheme }) => $appTheme.spacing.sm};
`;

export const BrandLink = styled.a<HeaderThemeProps>`
  display: inline-flex;
  align-items: center;

  gap: ${({ $appTheme }) => $appTheme.spacing.xs};

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  text-decoration: none;
`;

export const BrandIcon = styled.span<HeaderThemeProps>`
  display: inline-flex;

  color: ${({ $appTheme }) => $appTheme.colors.brand.primary};

  svg {
    width: 28px;
    height: 20px;
  }

  .youtube-icon-play {
    fill: ${({ $appTheme }) => $appTheme.colors.text.inverse};
  }
`;

export const BrandText = styled.span<HeaderThemeProps>`
  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  font-size: ${({ $appTheme }) => $appTheme.font.size.xl};

  font-weight: ${({ $appTheme }) => $appTheme.font.weight.bold};

  letter-spacing: -1px;

  @media (max-width: ${({ $appTheme }) => $appTheme.breakpoint.sm}px) {
    display: none;
  }
`;

export const HeaderCenter = styled.div<HeaderThemeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;

  gap: ${({ $appTheme }) => $appTheme.spacing.md};

  margin-inline: ${({ $appTheme }) => $appTheme.spacing.xl};

  @media (max-width: ${({ $appTheme }) => $appTheme.breakpoint.md}px) {
    margin-inline: ${({ $appTheme }) => $appTheme.spacing.xs};
  }
`;

export const HeaderRight = styled.div<HeaderThemeProps>`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  gap: ${({ $appTheme }) => $appTheme.spacing.sm};
`;

export const VoiceSearchAction = styled.div<HeaderThemeProps>`
  display: flex;

  @media (max-width: ${({ $appTheme }) => $appTheme.breakpoint.md}px) {
    display: none;
  }
`;

export const CreateAction = styled.div<HeaderThemeProps>`
  display: flex;

  @media (max-width: ${({ $appTheme }) => $appTheme.breakpoint.lg}px) {
    display: none;
  }
`;
