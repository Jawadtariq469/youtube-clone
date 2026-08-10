import styled from 'styled-components';

import type { StyledSidebarItemProps } from './types';

export const SidebarItemLink = styled.a<StyledSidebarItemProps>`
  display: flex;
  align-items: center;

  justify-content: ${({ $isExpanded }) =>
    $isExpanded ? 'flex-start' : 'center'};

  width: 100%;

  height: ${({ $appTheme }) => $appTheme.sidebar.itemHeight.regular};

  padding-inline: ${({ $appTheme, $isExpanded }) =>
    $isExpanded ? $appTheme.spacing.md : $appTheme.spacing.none};

  gap: ${({ $appTheme }) => $appTheme.spacing.lg};

  border-radius: ${({ $appTheme }) => $appTheme.radius.lg};

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: ${({ $appTheme, $isActive }) =>
    $isActive ? $appTheme.colors.background.active : 'transparent'};

  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;

  transition:
    background-color ${({ $appTheme }) => $appTheme.transition.duration.fast}
      ${({ $appTheme }) => $appTheme.transition.timing.easeInOut},
    color ${({ $appTheme }) => $appTheme.transition.duration.fast}
      ${({ $appTheme }) => $appTheme.transition.timing.easeInOut};

  &:hover {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.hover};
  }

  &:focus-visible {
    outline: ${({ $appTheme }) => $appTheme.border.width.medium} solid
      ${({ $appTheme }) => $appTheme.colors.border.focus};

    outline-offset: ${({ $appTheme }) => $appTheme.spacing.xxs};
  }

  svg {
    width: ${({ $appTheme }) => $appTheme.icon.size.md};

    height: ${({ $appTheme }) => $appTheme.icon.size.md};

    flex-shrink: 0;

    color: ${({ $appTheme }) => $appTheme.colors.icon.primary};
  }
`;

export const SidebarItemLabel = styled.span<
  Pick<StyledSidebarItemProps, '$appTheme' | '$isExpanded'>
>`
  display: ${({ $isExpanded }) => ($isExpanded ? 'inline' : 'none')};

  overflow: hidden;
  text-overflow: ellipsis;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  font-size: ${({ $appTheme }) => $appTheme.font.size.sm};

  font-weight: ${({ $appTheme }) => $appTheme.font.weight.medium};
`;
