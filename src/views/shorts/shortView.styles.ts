import styled from 'styled-components';

import type { AppTheme } from '../../theme';

interface ShortsThemeProps {
  $appTheme: AppTheme;
}

export const ShortsPage = styled.section`
  width: 100%;

  overflow: hidden;
`;

export const ShortsFeed = styled.div<ShortsThemeProps>`
  width: 100%;

  height: calc(100vh - ${({ $appTheme }) => $appTheme.header.height.desktop});

  height: calc(100dvh - ${({ $appTheme }) => $appTheme.header.height.desktop});

  overflow-y: auto;
  overscroll-behavior-y: contain;

  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ShortsStatusPanel = styled.div<ShortsThemeProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  min-height: calc(
    100vh - ${({ $appTheme }) => $appTheme.header.height.desktop}
  );

  padding: 24px;
`;

export const ShortsStatusMessage = styled.p`
  margin: 0;

  color: inherit;

  font-size: 15px;
  line-height: 1.5;

  opacity: 0.75;
`;

export const ShortsLoadError = styled.p`
  margin: 20px;

  color: inherit;

  font-size: 14px;
  text-align: center;

  opacity: 0.75;
`;
