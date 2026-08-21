import styled from 'styled-components';

import type { AppTheme } from './theme';

interface AppThemeProps {
  $appTheme: AppTheme;
}

interface MainContentProps extends AppThemeProps {
  $isWatchPage: boolean;
  $isShortsPage: boolean;
}

interface NavigationOverlayProps extends AppThemeProps {
  $isWatchPage: boolean;
}

export const AppLayout = styled.div<AppThemeProps>`
  display: flex;
  align-items: flex-start;

  width: 100%;
  min-width: 0;

  background-color: ${({ $appTheme }) => $appTheme.colors.background.page};
`;

export const DesktopSidebarSlot = styled.div<AppThemeProps>`
  position: sticky;
  top: ${({ $appTheme }) => $appTheme.header.height.desktop};

  flex-shrink: 0;

  height: calc(100dvh - ${({ $appTheme }) => $appTheme.header.height.desktop});

  & > aside {
    position: static;
    top: auto;

    height: 100%;
  }

  @media (max-width: ${({ $appTheme }) => $appTheme.breakpoint.md}px) {
    display: none;
  }
`;

export const MainContent = styled.main<MainContentProps>`
  flex: 1;
  min-width: 0;
  height: ${({ $appTheme, $isWatchPage }) =>
    $isWatchPage ? `calc(100vh - ${$appTheme.header.height.desktop})` : 'auto'};

  height: ${({ $appTheme, $isWatchPage }) =>
    $isWatchPage
      ? `calc(100dvh - ${$appTheme.header.height.desktop})`
      : 'auto'};
  min-height: calc(
    100vh - ${({ $appTheme }) => $appTheme.header.height.desktop}
  );

  min-height: calc(
    100dvh - ${({ $appTheme }) => $appTheme.header.height.desktop}
  );

  padding: ${({ $appTheme, $isWatchPage, $isShortsPage }) => {
    if ($isShortsPage) {
      return '0';
    }

    if ($isWatchPage) {
      return '12px 24px 40px';
    }

    return `12px ${$appTheme.spacing.xxxl} ${$appTheme.spacing.xxxl}`;
  }};

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: ${({ $appTheme }) => $appTheme.colors.background.page};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  box-sizing: border-box;
  overflow: ${({ $isWatchPage }) => ($isWatchPage ? 'hidden' : 'visible')};

  @media (max-width: 1100px) {
    height: auto;

    overflow: visible;
  }

  @media (max-width: ${({ $appTheme }) => $appTheme.breakpoint.md}px) {
    width: 100%;

    padding: ${({ $isWatchPage, $isShortsPage }) => {
      if ($isShortsPage) {
        return '0';
      }

      return $isWatchPage ? '8px 12px 32px' : '8px 12px 24px';
    }};
  }

  @media (max-width: ${({ $appTheme }) => $appTheme.breakpoint.sm}px) {
    padding: ${({ $isWatchPage, $isShortsPage }) => {
      if ($isShortsPage) {
        return '0';
      }

      return $isWatchPage ? '6px 8px 24px' : '8px 8px 20px';
    }};
  }
`;

export const NavigationBackdrop = styled.button<NavigationOverlayProps>`
  position: fixed;
  top: ${({ $appTheme }) => $appTheme.header.height.desktop};
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 2000;

  padding: 0;
  border: none;

  background-color: rgb(0 0 0 / 45%);

  cursor: default;

  @media (min-width: ${({ $appTheme }) => $appTheme.breakpoint.md + 1}px) {
    display: ${({ $isWatchPage }) => ($isWatchPage ? 'block' : 'none')};
  }
`;

export const NavigationDrawer = styled.aside<NavigationOverlayProps>`
  position: fixed;
  top: ${({ $appTheme }) => $appTheme.header.height.desktop};
  bottom: 0;
  left: 0;

  z-index: 2001;

  width: min(${({ $appTheme }) => $appTheme.sidebar.width.expanded}, 86vw);

  overflow: hidden;

  background-color: ${({ $appTheme }) => $appTheme.colors.background.page};

  box-shadow: 8px 0 24px rgb(0 0 0 / 22%);

  @media (min-width: ${({ $appTheme }) => $appTheme.breakpoint.md + 1}px) {
    display: ${({ $isWatchPage }) => ($isWatchPage ? 'block' : 'none')};
  }

  & > aside {
    position: static;
    top: auto;

    width: 100%;
    height: 100%;

    border-right: none;
  }
`;
