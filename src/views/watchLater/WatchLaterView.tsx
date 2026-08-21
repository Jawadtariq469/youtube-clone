import { useMemo, useState } from 'react';

import { Button, Skeleton } from '../../components/elements';

import { useAuth } from '../../store/auth';
import { useDownloads } from '../../store/downloads';
import { useTheme } from '../../store/global';
import { useWatchLater } from '../../store/watchLater';

import { ButtonHtmlType, ButtonSize, ButtonVariant } from '../../utils/enums';

import WatchLaterSummary from './WatchLaterSummary';
import WatchLaterVideoItem from './WatchLaterVideoItem';
import WatchLaterShortItem from './WatchLaterShortItem';
import {
  filterWatchLaterVideos,
  sortWatchLaterVideos,
} from './watchLaterUtils';

import {
  WatchLaterContent,
  WatchLaterErrorNotice,
  WatchLaterFilterBar,
  WatchLaterFilterButton,
  WatchLaterLayout,
  WatchLaterList,
  WatchLaterLoadingInformation,
  WatchLaterLoadingList,
  WatchLaterLoadingRow,
  WatchLaterLoadingThumbnail,
  WatchLaterPage,
  WatchLaterShortsGrid,
  WatchLaterSortSelect,
  WatchLaterStandaloneHeader,
  WatchLaterStandaloneTitle,
  WatchLaterStatusMessage,
  WatchLaterStatusPanel,
  WatchLaterToolbar,
} from './watchLater.styles';

import type { WatchLaterVideo } from '../../utils/types';

import type {
  WatchLaterFilterId,
  WatchLaterFilterOption,
  WatchLaterSortId,
  WatchLaterSortOption,
  WatchLaterViewProps,
} from './types';

const WATCH_LATER_FILTERS = [
  {
    id: 'all',
    label: 'All',
  },
  {
    id: 'videos',
    label: 'Videos',
  },
  {
    id: 'shorts',
    label: 'Shorts',
  },
] satisfies readonly WatchLaterFilterOption[];

const WATCH_LATER_SORT_OPTIONS = [
  {
    id: 'manual',
    label: 'Manual',
  },
  {
    id: 'newest',
    label: 'Date added (newest)',
  },
  {
    id: 'oldest',
    label: 'Date added (oldest)',
  },
] satisfies readonly WatchLaterSortOption[];

const LOADING_ROW_COUNT = 4;

const WatchLaterView = ({ onVideoSelect }: WatchLaterViewProps) => {
  const [selectedFilter, setSelectedFilter] =
    useState<WatchLaterFilterId>('all');

  const [selectedSort, setSelectedSort] = useState<WatchLaterSortId>('manual');

  const {
    user,
    isLoading: isAuthLoading,
    isInitialized: isAuthInitialized,
    signInWithGoogle,
  } = useAuth();

  const {
    items,
    isLoading: isWatchLaterLoading,
    isInitialized: isWatchLaterInitialized,
    error,
    isWatchLaterMutating,
    removeWatchLaterVideo,
  } = useWatchLater();

  const { downloadVideo, isDownloaded } = useDownloads();

  const { theme } = useTheme();

  const visibleWatchLaterVideos = useMemo(() => {
    const filteredVideos = filterWatchLaterVideos(items, selectedFilter);

    return sortWatchLaterVideos(filteredVideos, selectedSort);
  }, [items, selectedFilter, selectedSort]);

  const handleSignIn = (): void => {
    if (isAuthLoading) {
      return;
    }

    void signInWithGoogle();
  };

  const handleRemove = (videoId: string): void => {
    void removeWatchLaterVideo(videoId);
  };

  const handlePlayAll = (): void => {
    const firstVideo = visibleWatchLaterVideos[0] ?? items[0];

    if (firstVideo) {
      onVideoSelect(firstVideo.id);
    }
  };

  const handleShuffle = (): void => {
    const availableVideos =
      visibleWatchLaterVideos.length > 0 ? visibleWatchLaterVideos : items;

    if (availableVideos.length === 0) {
      return;
    }

    const randomVideoIndex = Math.floor(Math.random() * availableVideos.length);

    const randomVideo = availableVideos[randomVideoIndex];

    if (randomVideo) {
      onVideoSelect(randomVideo.id);
    }
  };

  const handleDownloadAll = (): void => {
    items.forEach((watchLaterVideo: WatchLaterVideo) => {
      if (!isDownloaded(watchLaterVideo.id)) {
        downloadVideo(watchLaterVideo);
      }
    });
  };

  const handleClearAll = (): void => {
    const shouldClearWatchLater = window.confirm(
      'Remove every video from Watch Later?',
    );

    if (!shouldClearWatchLater) {
      return;
    }

    void Promise.all(
      items.map((watchLaterVideo: WatchLaterVideo) =>
        removeWatchLaterVideo(watchLaterVideo.id),
      ),
    );
  };

  const shouldShowLoadingState =
    !isAuthInitialized ||
    (Boolean(user) &&
      (isAuthLoading || !isWatchLaterInitialized || isWatchLaterLoading));

  if (shouldShowLoadingState) {
    return (
      <WatchLaterPage>
        <WatchLaterStandaloneHeader>
          <WatchLaterStandaloneTitle>Watch Later</WatchLaterStandaloneTitle>
        </WatchLaterStandaloneHeader>

        <WatchLaterLoadingList
          aria-label="Loading Watch Later videos"
          aria-busy="true"
        >
          {Array.from(
            {
              length: LOADING_ROW_COUNT,
            },
            (_, index) => (
              <WatchLaterLoadingRow key={index}>
                <WatchLaterLoadingThumbnail>
                  <Skeleton width="100%" height="100%" borderRadius="9px" />
                </WatchLaterLoadingThumbnail>

                <WatchLaterLoadingInformation>
                  <Skeleton width="80%" height="16px" />

                  <Skeleton width="56%" height="12px" />
                </WatchLaterLoadingInformation>
              </WatchLaterLoadingRow>
            ),
          )}
        </WatchLaterLoadingList>
      </WatchLaterPage>
    );
  }

  if (!user) {
    return (
      <WatchLaterPage>
        <WatchLaterStandaloneHeader>
          <WatchLaterStandaloneTitle>Watch Later</WatchLaterStandaloneTitle>
        </WatchLaterStandaloneHeader>

        <WatchLaterStatusPanel>
          <WatchLaterStatusMessage>
            Sign in to save videos to Watch Later.
          </WatchLaterStatusMessage>

          <Button
            type={ButtonHtmlType.Button}
            variant={ButtonVariant.Primary}
            size={ButtonSize.Medium}
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </WatchLaterStatusPanel>
      </WatchLaterPage>
    );
  }

  if (items.length === 0) {
    return (
      <WatchLaterPage>
        <WatchLaterStandaloneHeader>
          <WatchLaterStandaloneTitle>Watch Later</WatchLaterStandaloneTitle>
        </WatchLaterStandaloneHeader>

        {error ? (
          <WatchLaterErrorNotice $appTheme={theme} role="alert">
            {error}
          </WatchLaterErrorNotice>
        ) : (
          <WatchLaterStatusPanel>
            <WatchLaterStatusMessage>
              Videos saved from their watch page will appear here.
            </WatchLaterStatusMessage>
          </WatchLaterStatusPanel>
        )}
      </WatchLaterPage>
    );
  }

  return (
    <WatchLaterPage>
      {error && (
        <WatchLaterErrorNotice $appTheme={theme} role="alert">
          {error}
        </WatchLaterErrorNotice>
      )}

      <WatchLaterLayout>
        <WatchLaterSummary
          videos={items}
          userName={user.name}
          onPlayAll={handlePlayAll}
          onShuffle={handleShuffle}
          onDownloadAll={handleDownloadAll}
          onClearAll={handleClearAll}
        />

        <WatchLaterContent>
          <WatchLaterToolbar>
            <WatchLaterSortSelect
              $appTheme={theme}
              value={selectedSort}
              aria-label="Sort Watch Later videos"
              onChange={(event) =>
                setSelectedSort(event.target.value as WatchLaterSortId)
              }
            >
              {WATCH_LATER_SORT_OPTIONS.map((sortOption) => (
                <option key={sortOption.id} value={sortOption.id}>
                  {sortOption.label}
                </option>
              ))}
            </WatchLaterSortSelect>

            <WatchLaterFilterBar aria-label="Filter Watch Later videos">
              {WATCH_LATER_FILTERS.map((filterOption) => {
                const isActive = selectedFilter === filterOption.id;

                return (
                  <WatchLaterFilterButton
                    key={filterOption.id}
                    type="button"
                    $appTheme={theme}
                    $isActive={isActive}
                    aria-pressed={isActive}
                    onClick={() => setSelectedFilter(filterOption.id)}
                  >
                    {filterOption.label}
                  </WatchLaterFilterButton>
                );
              })}
            </WatchLaterFilterBar>
          </WatchLaterToolbar>

          {visibleWatchLaterVideos.length === 0 ? (
            <WatchLaterStatusPanel>
              <WatchLaterStatusMessage>
                No saved {selectedFilter} found.
              </WatchLaterStatusMessage>
            </WatchLaterStatusPanel>
          ) : selectedFilter === 'shorts' ? (
            <WatchLaterShortsGrid>
              {visibleWatchLaterVideos.map(
                (watchLaterVideo: WatchLaterVideo) => (
                  <WatchLaterShortItem
                    key={watchLaterVideo.id}
                    watchLaterVideo={watchLaterVideo}
                    isRemoving={isWatchLaterMutating(watchLaterVideo.id)}
                    onVideoSelect={onVideoSelect}
                    onRemove={handleRemove}
                  />
                ),
              )}
            </WatchLaterShortsGrid>
          ) : (
            <WatchLaterList>
              {visibleWatchLaterVideos.map(
                (watchLaterVideo: WatchLaterVideo) => (
                  <WatchLaterVideoItem
                    key={watchLaterVideo.id}
                    watchLaterVideo={watchLaterVideo}
                    isRemoving={isWatchLaterMutating(watchLaterVideo.id)}
                    onVideoSelect={onVideoSelect}
                    onRemove={handleRemove}
                  />
                ),
              )}
            </WatchLaterList>
          )}
        </WatchLaterContent>
      </WatchLaterLayout>
    </WatchLaterPage>
  );
};

export default WatchLaterView;
