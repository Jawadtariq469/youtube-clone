import { SidebarItem } from '../../elements';
import {
  HistoryIcon,
  HomeIcon,
  ShortsIcon,
  SubscriptionsIcon,
} from '../../icons';
import { AppRoutes, AppText } from '../../../constants';
import { useTheme } from '../../../store/global';

import {
  SidebarContainer,
  SidebarList,
  SidebarNavigation,
} from './sidebar.styles';

import type { SidebarNavigationItem, SidebarProps } from './types';

const sidebarItems: SidebarNavigationItem[] = [
  {
    href: AppRoutes.Home,
    label: AppText.Sidebar.Home,
    icon: <HomeIcon />,
  },
  {
    href: AppRoutes.Shorts,
    label: AppText.Sidebar.Shorts,
    icon: <ShortsIcon />,
  },
  {
    href: AppRoutes.Subscriptions,
    label: AppText.Sidebar.Subscriptions,
    icon: <SubscriptionsIcon />,
  },
  {
    href: AppRoutes.History,
    label: AppText.Sidebar.History,
    icon: <HistoryIcon />,
  },
];

const Sidebar = ({ isExpanded, activePath }: SidebarProps) => {
  const { theme } = useTheme();

  return (
    <SidebarContainer $appTheme={theme} $isExpanded={isExpanded}>
      <SidebarNavigation aria-label={AppText.Sidebar.NavigationLabel}>
        <SidebarList>
          {sidebarItems.map((item) => {
            const isActive = activePath === item.href;

            return (
              <SidebarItem
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={isActive}
                isExpanded={isExpanded}
              />
            );
          })}
        </SidebarList>
      </SidebarNavigation>
    </SidebarContainer>
  );
};

export default Sidebar;
