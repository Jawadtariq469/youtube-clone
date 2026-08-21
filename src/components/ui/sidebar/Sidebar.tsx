import { useState } from 'react';

import { SidebarItem } from '../../elements';

import {
  DownloadIcon,
  HistoryIcon,
  HomeIcon,
  MoonIcon,
  ShortsIcon,
  SubscriptionsIcon,
  SunIcon,
  LikeOutlineIcon,
  WatchLaterIcon,
} from '../../icons';

import { AppRoutes, AppText, getChannelPath } from '../../../constants';

import { useTheme } from '../../../store/global';
import { useSubscriptions } from '../../../store/subscriptions';

import { ThemeMode } from '../../../utils/enums';

import {
  SidebarChannelAvatar,
  SidebarChannelAvatarImage,
  SidebarChannelInitial,
  SidebarChannelLink,
  SidebarChannelTitle,
  SidebarContainer,
  SidebarFooter,
  SidebarList,
  SidebarNavigation,
  SidebarSectionDivider,
  SidebarShowMoreButton,
  SidebarShowMoreIcon,
  SidebarShowMoreLabel,
  SidebarSubscribedChannels,
  SidebarSubscriptionsStatus,
  SidebarThemeButton,
  SidebarThemeIcon,
  SidebarThemeLabel,
} from './sidebar.styles';

import type { SidebarNavigationItem, SidebarProps } from './types';

const VISIBLE_SUBSCRIPTIONS_COUNT = 7;

const primarySidebarItems: SidebarNavigationItem[] = [
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
];

const secondarySidebarItems: SidebarNavigationItem[] = [
  {
    href: AppRoutes.History,
    label: AppText.Sidebar.History,
    icon: <HistoryIcon />,
  },
  {
    href: AppRoutes.WatchLater,
    label: AppText.Sidebar.WatchLater,
    icon: <WatchLaterIcon />,
  },
  {
    href: AppRoutes.Downloads,
    label: AppText.Sidebar.Downloads,
    icon: <DownloadIcon />,
  },
  {
    href: AppRoutes.LikedVideos,
    label: AppText.Sidebar.LikedVideos,
    icon: <LikeOutlineIcon />,
  },
];

const Sidebar = ({ isExpanded, activePath }: SidebarProps) => {
  const [isShowingAllSubscriptions, setIsShowingAllSubscriptions] =
    useState(false);

  const { theme, mode, toggleTheme } = useTheme();

  const {
    items: subscriptions,
    isLoading: isSubscriptionsLoading,
    error: subscriptionsError,
  } = useSubscriptions();

  const isDarkTheme = mode === ThemeMode.Dark;

  const visibleSubscriptions = isShowingAllSubscriptions
    ? subscriptions
    : subscriptions.slice(0, VISIBLE_SUBSCRIPTIONS_COUNT);

  const hasHiddenSubscriptions =
    subscriptions.length > VISIBLE_SUBSCRIPTIONS_COUNT;

  const themeButtonLabel = isDarkTheme
    ? 'Switch to light theme'
    : 'Switch to dark theme';

  const visibleThemeLabel = isDarkTheme ? 'Light theme' : 'Dark theme';

  const handleShowMoreToggle = (): void => {
    setIsShowingAllSubscriptions((currentlyShowingAll) => !currentlyShowingAll);
  };

  return (
    <SidebarContainer $appTheme={theme} $isExpanded={isExpanded}>
      <SidebarNavigation aria-label={AppText.Sidebar.NavigationLabel}>
        <SidebarList>
          {primarySidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={activePath === item.href}
              isExpanded={isExpanded}
            />
          ))}

          <SidebarSectionDivider $appTheme={theme} />

          <SidebarItem
            href={AppRoutes.Subscriptions}
            label={AppText.Sidebar.Subscriptions}
            icon={<SubscriptionsIcon />}
            isActive={activePath === AppRoutes.Subscriptions}
            isExpanded={isExpanded}
          />

          {isExpanded && (
            <SidebarSubscribedChannels aria-label="Subscribed channels">
              {isSubscriptionsLoading && (
                <SidebarSubscriptionsStatus>
                  Loading channels...
                </SidebarSubscriptionsStatus>
              )}

              {!isSubscriptionsLoading && subscriptionsError && (
                <SidebarSubscriptionsStatus>
                  Subscriptions unavailable.
                </SidebarSubscriptionsStatus>
              )}

              {!isSubscriptionsLoading &&
                !subscriptionsError &&
                visibleSubscriptions.map((subscription) => {
                  const channelPath = getChannelPath(subscription.channelId);

                  const isActive = activePath === channelPath;

                  const channelInitial =
                    subscription.channelTitle.trim().charAt(0) || '?';

                  return (
                    <SidebarChannelLink
                      key={subscription.channelId}
                      to={channelPath}
                      $appTheme={theme}
                      $isActive={isActive}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={`Open ${subscription.channelTitle} channel`}
                      title={subscription.channelTitle}
                    >
                      <SidebarChannelAvatar>
                        {subscription.channelAvatarUrl ? (
                          <SidebarChannelAvatarImage
                            src={subscription.channelAvatarUrl}
                            alt=""
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <SidebarChannelInitial>
                            {channelInitial}
                          </SidebarChannelInitial>
                        )}
                      </SidebarChannelAvatar>

                      <SidebarChannelTitle>
                        {subscription.channelTitle}
                      </SidebarChannelTitle>
                    </SidebarChannelLink>
                  );
                })}

              {!isSubscriptionsLoading &&
                !subscriptionsError &&
                hasHiddenSubscriptions && (
                  <SidebarShowMoreButton
                    type="button"
                    $appTheme={theme}
                    aria-expanded={isShowingAllSubscriptions}
                    onClick={handleShowMoreToggle}
                  >
                    <SidebarShowMoreIcon
                      $isShowingAll={isShowingAllSubscriptions}
                      aria-hidden="true"
                    />

                    <SidebarShowMoreLabel>
                      {isShowingAllSubscriptions ? 'Show less' : 'Show more'}
                    </SidebarShowMoreLabel>
                  </SidebarShowMoreButton>
                )}
            </SidebarSubscribedChannels>
          )}

          <SidebarSectionDivider $appTheme={theme} />

          {secondarySidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={activePath === item.href}
              isExpanded={isExpanded}
            />
          ))}
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
