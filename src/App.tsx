import { useState } from 'react';

import { Route, Routes, useLocation, useNavigate } from 'react-router';

import { Header, Sidebar } from './components/ui';

import { AppQueryParameters, AppRoutes } from './constants';

import { useAuthObserver } from './store/auth';

import { useHistoryObserver } from './store/history';

import { useSidebar, useTheme } from './store/global';

import { useScrollToTop } from './hooks/useScrollToTop';

import HistoryView from './views/history/HistoryView';
import HomeView from './views/home/HomeView';
import SearchResultsView from './views/searchResult/SearchResultsView';
import ShortsView from './views/ShortView';
import WatchView from './views/watch/WatchView';

import { WatchSidebarBackdrop, WatchSidebarDrawer } from './App.styles';

const App = () => {
  useAuthObserver();
  useHistoryObserver();
  useScrollToTop();

  const navigate = useNavigate();
  const location = useLocation();

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const { theme } = useTheme();

  const [openWatchSidebarLocationKey, setOpenWatchSidebarLocationKey] =
    useState<string | null>(null);

  const isWatchPage = location.pathname === AppRoutes.Watch;

  const isShortsPage = location.pathname === AppRoutes.Shorts;

  const isWatchSidebarOpen =
    isWatchPage && openWatchSidebarLocationKey === location.key;

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

  const handleMenuClick = (): void => {
    if (!isWatchPage) {
      toggleSidebar();

      return;
    }

    setOpenWatchSidebarLocationKey((currentLocationKey) =>
      currentLocationKey === location.key ? null : location.key,
    );
  };

  const handleWatchSidebarClose = (): void => {
    setOpenWatchSidebarLocationKey(null);
  };

  const mainPadding = isWatchPage
    ? '12px 24px 40px'
    : isShortsPage
      ? '0'
      : `12px ${theme.spacing.xxxl} ${theme.spacing.xxxl}`;

  return (
    <>
      <Header
        currentSearchValue={currentSearchValue}
        onSearch={handleSearch}
        onMenuClick={handleMenuClick}
      />

      {isWatchSidebarOpen && (
        <>
          <WatchSidebarBackdrop
            type="button"
            $appTheme={theme}
            aria-label="Close navigation menu"
            onClick={handleWatchSidebarClose}
          />

          <WatchSidebarDrawer
            $appTheme={theme}
            aria-label="Watch page navigation"
          >
            <Sidebar isExpanded activePath={location.pathname} />
          </WatchSidebarDrawer>
        </>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        {!isWatchPage && (
          <Sidebar isExpanded={isSidebarOpen} activePath={location.pathname} />
        )}

        <main
          style={{
            flex: 1,
            minWidth: 0,

            minHeight: `calc(
              100vh - ${theme.header.height.desktop}
            )`,

            padding: mainPadding,

            color: theme.colors.text.primary,

            backgroundColor: theme.colors.background.page,

            fontFamily: theme.font.family.primary,
          }}
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
              path={AppRoutes.Results}
              element={<SearchResultsView onVideoSelect={handleVideoSelect} />}
            />

            <Route
              path={AppRoutes.Watch}
              element={<WatchView onVideoSelect={handleVideoSelect} />}
            />

            <Route
              path={AppRoutes.History}
              element={<HistoryView onVideoSelect={handleVideoSelect} />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
