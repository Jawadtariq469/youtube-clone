import type { ReactNode } from 'react';

import type { AppTheme } from '../../../theme';

export interface SidebarProps {
  isExpanded: boolean;
  activePath: string;
}

export interface SidebarNavigationItem {
  href: string;
  label: string;
  icon: ReactNode;
}

export interface StyledSidebarProps {
  $appTheme: AppTheme;
  $isExpanded: boolean;
}

export interface StyledSubscribedChannelProps {
  $appTheme: AppTheme;
  $isActive: boolean;
}

export interface StyledShowMoreIconProps {
  $isShowingAll: boolean;
}
