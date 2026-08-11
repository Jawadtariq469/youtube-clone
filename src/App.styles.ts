import styled from 'styled-components';

import type { AppTheme } from './theme';

interface WatchSidebarProps {
  $appTheme: AppTheme;
}

export const WatchSidebarBackdrop = styled.button<WatchSidebarProps>`
  position: fixed;
  top: ${({ $appTheme }) => $appTheme.header.height.desktop};
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 2000;

  padding: 0;
  border: none;

  background-color: rgb(0 0 0 / 35%);

  cursor: default;
`;

export const WatchSidebarDrawer = styled.aside<WatchSidebarProps>`
  position: fixed;
  top: ${({ $appTheme }) => $appTheme.header.height.desktop};
  bottom: 0;
  left: 0;

  z-index: 2001;

  width: min(240px, 86vw);

  overflow-y: auto;

  background-color: ${({ $appTheme }) => $appTheme.colors.background.page};

  box-shadow: 8px 0 24px rgb(0 0 0 / 18%);

  & > * {
    width: 100%;
  }
`;
