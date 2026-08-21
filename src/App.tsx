import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';

import { Header, Sidebar } from './components/ui';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useAuthObserver } from './store/auth';
import { useSidebar, useTheme } from './store/global';
import { useHistoryObserver } from './store/history';

import HistoryView from './views/history/HistoryView';
import HomeView from './views/home/HomeView';
import SearchResultsView from './views/searchResult/SearchResultsView';
import ShortsView from './views/shorts/ShortView';
import WatchView from './views/watch/WatchView';
import SubscriptionsView from './views/subscriptions/SubscriptionsView';
import {
  AppLayout,
  DesktopSidebarSlot,
  MainContent,
  NavigationBackdrop,
  NavigationDrawer,
} from './App.styles';
import { useSubscriptionsObserver } from './store/subscriptions';
import ChannelView from './views/channel/ChannelView';
import DownloadsView from './views/downloads/DownloadsView';
import LikedVideosView from './views/likedVideos/LikedVideosView';
import WatchLaterView from './views/watchLater/WatchLaterView';

import { useWatchLaterObserver } from './store/watchLater';
import { useLikedVideosObserver } from './store/likedVideos';
import { AppQueryParameters, AppRoutes, getChannelPath } from './constants';
const App = () => {
  useAuthObserver();
  useHistoryObserver();
  useSubscriptionsObserver();
  useLikedVideosObserver();
  useWatchLaterObserver();
  useScrollToTop();

  const navigate = useNavigate();
  const location = useLocation();

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const { theme } = useTheme();

  const [openDrawerLocationKey, setOpenDrawerLocationKey] = useState<
    string | null
  >(null);

  const isWatchPage = location.pathname === AppRoutes.Watch;

  const isShortsPage = location.pathname === AppRoutes.Shorts;

  const isNavigationDrawerOpen = openDrawerLocationKey === location.key;
  const shouldLockPageScroll = isWatchPage && isNavigationDrawerOpen;

  useEffect(() => {
    if (!shouldLockPageScroll) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [shouldLockPageScroll]);
  const currentSearchValue =
    location.pathname === AppRoutes.Results
      ? (new URLSearchParams(location.search).get(
          AppQueryParameters.SearchQuery,
        ) ?? '')
      : '';

  const handleSearch = (searchValue: string): void => {
    const normalizedSearchValue = searchValue.trim();

    if (!normalizedSearchValue) {
      return;
    }

    const searchParameters = new URLSearchParams({
      [AppQueryParameters.SearchQuery]: normalizedSearchValue,
    });

    navigate(`${AppRoutes.Results}?${searchParameters.toString()}`);
  };

  const handleVideoSelect = (videoId: string): void => {
    const searchParameters = new URLSearchParams({
      [AppQueryParameters.VideoId]: videoId,
    });

    navigate(`${AppRoutes.Watch}?${searchParameters.toString()}`);
  };
  const handleChannelSelect = (channelId: string): void => {
    navigate(getChannelPath(channelId));
  };
  const handleMenuClick = (): void => {
    const isMobileViewport = window.matchMedia(
      `(max-width: ${theme.breakpoint.md}px)`,
    ).matches;

    if (isMobileViewport || isWatchPage) {
      setOpenDrawerLocationKey((currentKey) =>
        currentKey === location.key ? null : location.key,
      );

      return;
    }

    toggleSidebar();
  };

  const handleDrawerClose = (): void => {
    setOpenDrawerLocationKey(null);
  };

  return (
    <>
      <Header
        currentSearchValue={currentSearchValue}
        onSearch={handleSearch}
        onMenuClick={handleMenuClick}
      />

      {isNavigationDrawerOpen && (
        <>
          <NavigationBackdrop
            type="button"
            $appTheme={theme}
            $isWatchPage={isWatchPage}
            aria-label="Close navigation menu"
            onClick={handleDrawerClose}
          />

          <NavigationDrawer
            $appTheme={theme}
            $isWatchPage={isWatchPage}
            aria-label="Navigation menu"
          >
            <Sidebar isExpanded activePath={location.pathname} />
          </NavigationDrawer>
        </>
      )}

      <AppLayout $appTheme={theme}>
        {!isWatchPage && (
          <DesktopSidebarSlot $appTheme={theme}>
            <Sidebar
              isExpanded={isSidebarOpen}
              activePath={location.pathname}
            />
          </DesktopSidebarSlot>
        )}

        <MainContent
          $appTheme={theme}
          $isWatchPage={isWatchPage}
          $isShortsPage={isShortsPage}
        >
          <Routes>
            <Route
              path={AppRoutes.Home}
              element={<HomeView onVideoSelect={handleVideoSelect} />}
            />

            <Route
              path={AppRoutes.Shorts}
              element={<ShortsView onVideoSelect={handleVideoSelect} />}
            />
            <Route
              path={AppRoutes.Subscriptions}
              element={<SubscriptionsView onVideoSelect={handleVideoSelect} />}
            />
            <Route
              path={AppRoutes.Results}
              element={<SearchResultsView onVideoSelect={handleVideoSelect} />}
            />

            <Route
              path={AppRoutes.Watch}
              element={
                <WatchView
                  onVideoSelect={handleVideoSelect}
                  onChannelSelect={handleChannelSelect}
                />
              }
            />
            <Route
              path={AppRoutes.Channel}
              element={<ChannelView onVideoSelect={handleVideoSelect} />}
            />
            <Route
              path={AppRoutes.History}
              element={<HistoryView onVideoSelect={handleVideoSelect} />}
            />

            <Route
              path={AppRoutes.Downloads}
              element={<DownloadsView onVideoSelect={handleVideoSelect} />}
            />
            <Route
              path={AppRoutes.LikedVideos}
              element={<LikedVideosView onVideoSelect={handleVideoSelect} />}
            />
            <Route
              path={AppRoutes.WatchLater}
              element={<WatchLaterView onVideoSelect={handleVideoSelect} />}
            />
          </Routes>
        </MainContent>
      </AppLayout>
    </>
  );
};

export default App;
