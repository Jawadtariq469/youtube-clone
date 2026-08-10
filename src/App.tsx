import { useState } from 'react';

import { Button } from './components/elements';
import { Header, Sidebar } from './components/ui';
import { AppConstants, AppRoutes, AppText } from './constants';
import { useSidebar, useTheme } from './store/global';

const App = () => {
  const [lastSearch, setLastSearch] = useState<string>(
    AppConstants.EmptyString,
  );

  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Header
        userName={AppText.HeaderTest.UserName}
        onSearch={setLastSearch}
        onMenuClick={toggleSidebar}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <Sidebar isExpanded={isSidebarOpen} activePath={AppRoutes.Home} />

        <main
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: `calc(
              100vh - ${theme.header.height.desktop}
            )`,

            padding: theme.spacing.xxxl,

            color: theme.colors.text.primary,

            backgroundColor: theme.colors.background.page,

            fontFamily: theme.font.family.primary,
          }}
        >
          <p>
            {AppText.HeaderTest.LastSearch}: {lastSearch}
          </p>

          <Button onClick={toggleTheme}>{AppText.Common.ToggleTheme}</Button>
        </main>
      </div>
    </>
  );
};

export default App;
