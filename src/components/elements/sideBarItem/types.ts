import type { AnchorHTMLAttributes, ReactNode } from 'react';

import type { AppTheme } from '../../../theme';

export interface SidebarItemProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children' | 'href'
> {
  icon: ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  isExpanded?: boolean;
}

export interface StyledSidebarItemProps {
  $appTheme: AppTheme;
  $isActive: boolean;
  $isExpanded: boolean;
}
