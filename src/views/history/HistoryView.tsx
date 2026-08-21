import { useMemo, useState } from 'react';

import { Button } from '../../components/elements';
import {
  PauseIcon,
  ResumeIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
} from '../../components/icons';
import { useAuth } from '../../store/auth';
import { useTheme } from '../../store/global';
import { useWatchHistory } from '../../store/history';
import { ButtonHtmlType, ButtonSize, ButtonVariant } from '../../utils/enums';

import HistoryVideoItem from './HistoryVideoItem';
import { filterHistoryItems, groupHistoryItemsByDate } from './history';

import {
  HistoryContent,
  HistoryControlButton,
  HistoryControlIcon,
  HistoryControlLink,
  HistoryControlList,
  HistoryControls,
  HistoryDateSection,
  HistoryDateTitle,
  HistoryFilterBar,
  HistoryFilterButton,
  HistoryHeader,
  HistoryItemsList,
  HistoryLayout,
  HistoryPage,
  HistoryPausedNotice,
  HistorySearchField,
  HistorySearchInput,
  HistoryStatusMessage,
  HistoryStatusPanel,
  HistoryTitle,
  HistoryLoadingPanel,
  HistoryLoadingSpinner,
  HistoryLoadingText,
} from './historyView.styles';

import type { ChangeEvent } from 'react';
import type {
  HistoryFilterId,
  HistoryFilterOption,
  HistoryViewProps,
} from './types';

const HISTORY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'videos', label: 'Videos' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'podcasts', label: 'Podcasts' },
  { id: 'music', label: 'Music' },
] satisfies readonly HistoryFilterOption[];

const HistoryView = ({ onVideoSelect }: HistoryViewProps) => {
  const [selectedFilter, setSelectedFilter] = useState<HistoryFilterId>('all');

  const [searchValue, setSearchValue] = useState('');

  const {
    user,
    isLoading: isAuthLoading,
    isInitialized: isAuthInitialized,
    signInWithGoogle,
  } = useAuth();

  const {
    items,

    isLoading: isHistoryLoading,
    isInitialized: isHistoryInitialized,

    isMutating,
    isPaused,
    error,

    removeVideo,
    clearHistory,
    setHistoryPaused,
  } = useWatchHistory();

  const { theme } = useTheme();

  const filteredHistoryItems = useMemo(
    () => filterHistoryItems(items, selectedFilter, searchValue),
    [items, searchValue, selectedFilter],
  );

  const historyGroups = useMemo(
    () => groupHistoryItemsByDate(filteredHistoryItems),
    [filteredHistoryItems],
  );

  const handleSignIn = (): void => {
    if (isAuthLoading) {
      return;
    }

    void signInWithGoogle();
  };

  const handleRemove = (videoId: string): void => {
    void removeVideo(videoId);
  };

  const handleClearHistory = (): void => {
    const shouldClearHistory = window.confirm(
      'Clear your entire watch history?',
    );

    if (!shouldClearHistory) {
      return;
    }

    void clearHistory();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleClearFilters = (): void => {
    setSelectedFilter('all');
    setSearchValue('');
  };

  const hasActiveFilters =
    selectedFilter !== 'all' || searchValue.trim().length > 0;

  const shouldShowLoadingState =
    !isAuthInitialized ||
    (Boolean(user) && (isAuthLoading || !isHistoryInitialized));

  if (shouldShowLoadingState) {
    return (
      <HistoryPage>
        <HistoryLayout>
          <HistoryHeader>
            <HistoryTitle>Watch history</HistoryTitle>
          </HistoryHeader>

          <HistoryContent>
            <HistoryLoadingPanel
              role="status"
              aria-label="Loading watch history"
              aria-busy="true"
            >
              <HistoryLoadingSpinner $appTheme={theme} aria-hidden="true" />

              <HistoryLoadingText>Loading watch history...</HistoryLoadingText>
            </HistoryLoadingPanel>
          </HistoryContent>
        </HistoryLayout>
      </HistoryPage>
    );
  }

  if (!user) {
    return (
      <HistoryPage>
        <HistoryLayout>
          <HistoryHeader>
            <HistoryTitle>Watch history</HistoryTitle>
          </HistoryHeader>

          <HistoryContent>
            <HistoryStatusPanel>
              <HistoryStatusMessage>
                Sign in to view and save your watch history.
              </HistoryStatusMessage>

              <Button
                type={ButtonHtmlType.Button}
                variant={ButtonVariant.Primary}
                size={ButtonSize.Medium}
                onClick={handleSignIn}
              >
                Sign in
              </Button>
            </HistoryStatusPanel>
          </HistoryContent>
        </HistoryLayout>
      </HistoryPage>
    );
  }

  return (
    <HistoryPage>
      <HistoryLayout>
        <HistoryHeader>
          <HistoryTitle>Watch history</HistoryTitle>

          <HistoryFilterBar aria-label="Filter watch history">
            {HISTORY_FILTERS.map((filterOption) => {
              const isActive = selectedFilter === filterOption.id;

              return (
                <HistoryFilterButton
                  key={filterOption.id}
                  type="button"
                  $appTheme={theme}
                  $isActive={isActive}
                  aria-pressed={isActive}
                  onClick={() => setSelectedFilter(filterOption.id)}
                >
                  {filterOption.label}
                </HistoryFilterButton>
              );
            })}
          </HistoryFilterBar>
        </HistoryHeader>

        <HistoryContent>
          {isPaused && (
            <HistoryPausedNotice $appTheme={theme} role="status">
              Watch history is paused. Videos you watch will not be added until
              you resume it.
            </HistoryPausedNotice>
          )}

          {isHistoryLoading && (
            <HistoryLoadingPanel
              role="status"
              aria-label="Loading watch history"
              aria-busy="true"
            >
              <HistoryLoadingSpinner $appTheme={theme} aria-hidden="true" />

              <HistoryLoadingText>Loading watch history...</HistoryLoadingText>
            </HistoryLoadingPanel>
          )}
          {!isHistoryLoading && error && (
            <HistoryStatusPanel>
              <HistoryStatusMessage role="alert">{error}</HistoryStatusMessage>
            </HistoryStatusPanel>
          )}

          {!isHistoryLoading && !error && items.length === 0 && (
            <HistoryStatusPanel>
              <HistoryStatusMessage>
                Videos you watch will appear here.
              </HistoryStatusMessage>
            </HistoryStatusPanel>
          )}

          {!isHistoryLoading &&
            !error &&
            items.length > 0 &&
            filteredHistoryItems.length === 0 && (
              <HistoryStatusPanel>
                <HistoryStatusMessage>
                  No watch history matches your current search or filter.
                </HistoryStatusMessage>

                {hasActiveFilters && (
                  <Button
                    type={ButtonHtmlType.Button}
                    variant={ButtonVariant.Secondary}
                    size={ButtonSize.Medium}
                    onClick={handleClearFilters}
                  >
                    Clear filters
                  </Button>
                )}
              </HistoryStatusPanel>
            )}

          {!isHistoryLoading &&
            !error &&
            historyGroups.map((historyGroup) => (
              <HistoryDateSection key={historyGroup.id}>
                <HistoryDateTitle>{historyGroup.label}</HistoryDateTitle>

                <HistoryItemsList>
                  {historyGroup.items.map((historyItem) => (
                    <HistoryVideoItem
                      key={historyItem.id}
                      historyItem={historyItem}
                      isRemoving={isMutating}
                      onVideoSelect={onVideoSelect}
                      onRemove={handleRemove}
                    />
                  ))}
                </HistoryItemsList>
              </HistoryDateSection>
            ))}
        </HistoryContent>

        <HistoryControls $appTheme={theme} aria-label="Watch history controls">
          <HistorySearchField $appTheme={theme}>
            <SearchIcon />

            <HistorySearchInput
              type="search"
              value={searchValue}
              $appTheme={theme}
              placeholder="Search watch history"
              aria-label="Search watch history"
              onChange={handleSearchChange}
            />
          </HistorySearchField>

          <HistoryControlList>
            <HistoryControlButton
              type="button"
              $appTheme={theme}
              disabled={items.length === 0 || isMutating}
              onClick={handleClearHistory}
            >
              <HistoryControlIcon>
                <TrashIcon />
              </HistoryControlIcon>

              {isMutating ? 'Updating history...' : 'Clear all watch history'}
            </HistoryControlButton>

            <HistoryControlButton
              type="button"
              $appTheme={theme}
              onClick={() => setHistoryPaused(!isPaused)}
            >
              <HistoryControlIcon>
                {isPaused ? <ResumeIcon /> : <PauseIcon />}
              </HistoryControlIcon>

              {isPaused ? 'Resume watch history' : 'Pause watch history'}
            </HistoryControlButton>

            <HistoryControlLink
              $appTheme={theme}
              href="https://myactivity.google.com/product/youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HistoryControlIcon>
                <SettingsIcon />
              </HistoryControlIcon>
              Manage all history
            </HistoryControlLink>
          </HistoryControlList>
        </HistoryControls>
      </HistoryLayout>
    </HistoryPage>
  );
};

export default HistoryView;
