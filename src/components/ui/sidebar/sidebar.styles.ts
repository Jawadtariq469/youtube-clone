import styled from 'styled-components';

import type { StyledSidebarProps } from './types';

export const SidebarContainer = styled.aside<StyledSidebarProps>`
  position: sticky;
  top: ${({ $appTheme }) => $appTheme.header.height.desktop};

  display: flex;
  flex-direction: column;
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
  overscroll-behavior-y: contain;

  border-right: ${({ $appTheme }) => $appTheme.border.width.thin} solid
    ${({ $appTheme }) => $appTheme.colors.border.subtle};

  background-color: ${({ $appTheme }) => $appTheme.colors.background.page};

  transition: width ${({ $appTheme }) => $appTheme.transition.duration.fast}
    ${({ $appTheme }) => $appTheme.transition.timing.easeInOut};

  box-sizing: border-box;
`;

export const SidebarNavigation = styled.nav`
  flex: 1;
  width: 100%;
`;

export const SidebarList = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const SidebarFooter = styled.div`
  flex-shrink: 0;

  width: 100%;
  padding-top: 8px;

  border-top: 1px solid rgb(128 128 128 / 20%);
`;

export const SidebarThemeButton = styled.button<StyledSidebarProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ $isExpanded }) =>
    $isExpanded ? 'flex-start' : 'center'};
  gap: 16px;

  width: 100%;
  min-height: 48px;
  padding: ${({ $isExpanded }) => ($isExpanded ? '0 12px' : '0')};

  overflow: hidden;

  border: none;
  border-radius: 10px;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};
  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  font-size: 14px;
  font-weight: 500;
  text-align: left;

  white-space: nowrap;
  cursor: pointer;

  transition:
    color ${({ $appTheme }) => $appTheme.transition.duration.fast},
    background-color ${({ $appTheme }) => $appTheme.transition.duration.fast};

  &:hover {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.active};
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.text.primary};

    outline-offset: 2px;
  }
`;

export const SidebarThemeIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 24px;
  height: 24px;
`;

export const SidebarThemeLabel = styled.span`
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
`;
