import { SidebarItem } from '../../elements';
import {
  HistoryIcon,
  HomeIcon,
  MoonIcon,
  ShortsIcon,
  SubscriptionsIcon,
  SunIcon,
} from '../../icons';
import { AppRoutes, AppText } from '../../../constants';
import { useTheme } from '../../../store/global';
import { ThemeMode } from '../../../utils/enums';

import {
  SidebarContainer,
  SidebarFooter,
  SidebarList,
  SidebarNavigation,
  SidebarThemeButton,
  SidebarThemeIcon,
  SidebarThemeLabel,
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
  const { theme, mode, toggleTheme } = useTheme();

  const isDarkTheme = mode === ThemeMode.Dark;

  /*
   * The label describes what clicking the
   * button will change the theme to.
   */
  const themeButtonLabel = isDarkTheme
    ? 'Switch to light theme'
    : 'Switch to dark theme';

  const visibleThemeLabel = isDarkTheme ? 'Light theme' : 'Dark theme';

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

      <SidebarFooter>
        <SidebarThemeButton
          type="button"
          $appTheme={theme}
          $isExpanded={isExpanded}
          aria-label={themeButtonLabel}
          title={!isExpanded ? themeButtonLabel : undefined}
          onClick={toggleTheme}
        >
          <SidebarThemeIcon>
            {isDarkTheme ? <SunIcon /> : <MoonIcon />}
          </SidebarThemeIcon>

          {isExpanded && (
            <SidebarThemeLabel>{visibleThemeLabel}</SidebarThemeLabel>
          )}
        </SidebarThemeButton>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
