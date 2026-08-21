import styled from 'styled-components';
import { Link } from 'react-router';

import type {
  StyledShowMoreIconProps,
  StyledSidebarProps,
  StyledSubscribedChannelProps,
} from './types';

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

export const SidebarSectionDivider = styled.div<
  Pick<StyledSidebarProps, '$appTheme'>
>`
  width: 100%;
  height: 1px;

  margin: 8px 0;

  background-color: ${({ $appTheme }) => $appTheme.colors.border.subtle};
`;

export const SidebarSubscribedChannels = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-width: 0;

  margin-top: 2px;
`;

export const SidebarChannelLink = styled(Link)<StyledSubscribedChannelProps>`
  display: flex;
  align-items: center;
  gap: 16px;

  width: 100%;
  min-width: 0;
  min-height: 40px;

  padding: 6px 12px;

  border-radius: 10px;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: ${({ $appTheme, $isActive }) =>
    $isActive ? $appTheme.colors.background.active : 'transparent'};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  text-decoration: none;

  box-sizing: border-box;

  transition: background-color
    ${({ $appTheme }) => $appTheme.transition.duration.fast};

  &:hover {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.hover};
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};

    outline-offset: 2px;
  }
`;

export const SidebarChannelAvatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 24px;
  height: 24px;

  overflow: hidden;

  border-radius: 50%;

  background-color: rgb(128 128 128 / 24%);
`;

export const SidebarChannelAvatarImage = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const SidebarChannelInitial = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const SidebarChannelTitle = styled.span`
  flex: 1;

  min-width: 0;

  overflow: hidden;

  font-size: 14px;
  font-weight: 500;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SidebarSubscriptionsStatus = styled.p`
  margin: 4px 12px 8px 52px;

  overflow-wrap: anywhere;

  color: inherit;

  font-size: 12px;
  line-height: 1.4;

  opacity: 0.65;
`;

export const SidebarShowMoreButton = styled.button<
  Pick<StyledSidebarProps, '$appTheme'>
>`
  display: flex;
  align-items: center;
  gap: 16px;

  width: 100%;
  min-height: 40px;

  padding: 6px 12px;

  border: none;
  border-radius: 10px;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  font-size: 14px;
  font-weight: 500;
  text-align: left;

  cursor: pointer;

  &:hover {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.hover};
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};

    outline-offset: 2px;
  }
`;

export const SidebarShowMoreIcon = styled.span<StyledShowMoreIconProps>`
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 24px;
  height: 24px;

  &::before {
    width: 8px;
    height: 8px;

    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;

    content: '';

    transform: ${({ $isShowingAll }) =>
      $isShowingAll
        ? 'translateY(2px) rotate(225deg)'
        : 'translateY(-2px) rotate(45deg)'};
  }
`;

export const SidebarShowMoreLabel = styled.span`
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
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
