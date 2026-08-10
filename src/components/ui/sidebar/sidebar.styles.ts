import styled from 'styled-components';

import type { StyledSidebarProps } from './types';

export const SidebarContainer = styled.aside<StyledSidebarProps>`
  position: sticky;

  top: ${({ $appTheme }) => $appTheme.header.height.desktop};

  flex-shrink: 0;

  width: ${({ $appTheme, $isExpanded }) =>
    $isExpanded
      ? $appTheme.sidebar.width.expanded
      : $appTheme.sidebar.width.collapsed};

  height: ${({ $appTheme }) =>
    `calc(
        100vh - ${$appTheme.header.height.desktop}
      )`};

  padding: ${({ $appTheme }) => $appTheme.spacing.sm};

  overflow-x: hidden;
  overflow-y: auto;

  border-right: ${({ $appTheme }) => $appTheme.border.width.thin} solid
    ${({ $appTheme }) => $appTheme.colors.border.subtle};

  background-color: ${({ $appTheme }) => $appTheme.colors.background.page};

  transition: width ${({ $appTheme }) => $appTheme.transition.duration.fast}
    ${({ $appTheme }) => $appTheme.transition.timing.easeInOut};

  box-sizing: border-box;
`;

export const SidebarNavigation = styled.nav`
  width: 100%;
`;

export const SidebarList = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;
