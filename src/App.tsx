import { Route, Routes, useLocation, useNavigate } from 'react-router';

import { Header, Sidebar } from './components/ui';
import { AppQueryParameters, AppRoutes } from './constants';
import { useSidebar, useTheme } from './store/global';
import HomeView from './views/home/HomeView';
import SearchResultsView from './views/searchResult/SearchResultsView';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const { theme } = useTheme();

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
    console.log('Selected video:', videoId);
  };

  return (
    <>
      <Header
        userName="GU"
        currentSearchValue={currentSearchValue}
        onSearch={handleSearch}
        onMenuClick={toggleSidebar}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Sidebar isExpanded={isSidebarOpen} activePath={location.pathname} />

        <main
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: `calc(
            100vh - ${theme.header.height.desktop}
          )`,
            padding: `12px ${theme.spacing.xxxl} ${theme.spacing.xxxl}`,
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
              path={AppRoutes.Results}
              element={<SearchResultsView onVideoSelect={handleVideoSelect} />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
