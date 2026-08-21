import { useMemo, useState } from 'react';

import { Button } from '../../components/elements';

import { useAuth } from '../../store/auth';
import { useDownloads } from '../../store/downloads';
import { useTheme } from '../../store/global';
import { useLikedVideos } from '../../store/likedVideos';

import { ButtonHtmlType, ButtonSize, ButtonVariant } from '../../utils/enums';

import LikedShortItem from './LikedShortItem';
import LikedVideoItem from './LikedVideoItem';
import LikedVideosSummary from './LikedVideosSummary';

import { filterLikedVideos } from './likedVideosutils';

import {
  LikedShortsGrid,
  LikedVideosContent,
  LikedVideosErrorNotice,
  LikedVideosFilterBar,
  LikedVideosFilterButton,
  LikedVideosLayout,
  LikedVideosList,
  LikedVideosPage,
  LikedVideosStandaloneHeader,
  LikedVideosStandaloneTitle,
  LikedVideosStatusMessage,
  LikedVideosStatusPanel,
} from './likedVideos.styles';

import type {
  LikedVideosFilterId,
  LikedVideosFilterOption,
  LikedVideosViewProps,
} from './types';

const LIKED_VIDEO_FILTERS = [
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
] satisfies readonly LikedVideosFilterOption[];

const LikedVideosView = ({ onVideoSelect }: LikedVideosViewProps) => {
  const [selectedFilter, setSelectedFilter] =
    useState<LikedVideosFilterId>('all');

  const {
    user,
    isLoading: isAuthLoading,
    isInitialized: isAuthInitialized,
    signInWithGoogle,
  } = useAuth();

  const {
    items,
    isLoading: isLikedVideosLoading,
    isInitialized: isLikedVideosInitialized,
    error,
    isLikeMutating,
    removeLikedVideo,
  } = useLikedVideos();

  const { downloadVideo, isDownloaded } = useDownloads();

  const { theme } = useTheme();

  const filteredLikedVideos = useMemo(
    () => filterLikedVideos(items, selectedFilter),
    [items, selectedFilter],
  );

  const handleSignIn = (): void => {
    if (isAuthLoading) {
      return;
    }

    void signInWithGoogle();
  };

  const handleRemove = (videoId: string): void => {
    void removeLikedVideo(videoId);
  };

  const handlePlayAll = (): void => {
    const firstVideo = filteredLikedVideos[0] ?? items[0];

    if (firstVideo) {
      onVideoSelect(firstVideo.id);
    }
  };

  const handleShuffle = (): void => {
    const availableVideos =
      filteredLikedVideos.length > 0 ? filteredLikedVideos : items;

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
    items.forEach((likedVideo) => {
      if (!isDownloaded(likedVideo.id)) {
        downloadVideo(likedVideo);
      }
    });
  };

  const handleClearAll = (): void => {
    const shouldClearLikedVideos = window.confirm(
      'Remove every video from liked videos?',
    );

    if (!shouldClearLikedVideos) {
      return;
    }

    void Promise.all(
      items.map((likedVideo) => removeLikedVideo(likedVideo.id)),
    );
  };

  const shouldShowLoadingState =
    !isAuthInitialized ||
    (Boolean(user) &&
      (isAuthLoading || !isLikedVideosInitialized || isLikedVideosLoading));

  if (shouldShowLoadingState) {
    return (
      <LikedVideosPage>
        <LikedVideosStandaloneHeader>
          <LikedVideosStandaloneTitle>Liked videos</LikedVideosStandaloneTitle>
        </LikedVideosStandaloneHeader>

        <LikedVideosStatusPanel aria-live="polite">
          <LikedVideosStatusMessage>
            Loading liked videos...
          </LikedVideosStatusMessage>
        </LikedVideosStatusPanel>
      </LikedVideosPage>
    );
  }

  if (!user) {
    return (
      <LikedVideosPage>
        <LikedVideosStandaloneHeader>
          <LikedVideosStandaloneTitle>Liked videos</LikedVideosStandaloneTitle>
        </LikedVideosStandaloneHeader>

        <LikedVideosStatusPanel>
          <LikedVideosStatusMessage>
            Sign in to like videos and view them here.
          </LikedVideosStatusMessage>

          <Button
            type={ButtonHtmlType.Button}
            variant={ButtonVariant.Primary}
            size={ButtonSize.Medium}
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </LikedVideosStatusPanel>
      </LikedVideosPage>
    );
  }

  if (items.length === 0) {
    return (
      <LikedVideosPage>
        <LikedVideosStandaloneHeader>
          <LikedVideosStandaloneTitle>Liked videos</LikedVideosStandaloneTitle>
        </LikedVideosStandaloneHeader>

        {error ? (
          <LikedVideosErrorNotice $appTheme={theme} role="alert">
            {error}
          </LikedVideosErrorNotice>
        ) : (
          <LikedVideosStatusPanel>
            <LikedVideosStatusMessage>
              Videos you like from their watch page will appear here.
            </LikedVideosStatusMessage>
          </LikedVideosStatusPanel>
        )}
      </LikedVideosPage>
    );
  }

  return (
    <LikedVideosPage>
      {error && (
        <LikedVideosErrorNotice $appTheme={theme} role="alert">
          {error}
        </LikedVideosErrorNotice>
      )}

      <LikedVideosLayout>
        <LikedVideosSummary
          videos={items}
          userName={user.name}
          onPlayAll={handlePlayAll}
          onShuffle={handleShuffle}
          onDownloadAll={handleDownloadAll}
          onClearAll={handleClearAll}
        />

        <LikedVideosContent>
          <LikedVideosFilterBar aria-label="Filter liked videos">
            {LIKED_VIDEO_FILTERS.map((filterOption) => {
              const isActive = selectedFilter === filterOption.id;

              return (
                <LikedVideosFilterButton
                  key={filterOption.id}
                  type="button"
                  $appTheme={theme}
                  $isActive={isActive}
                  aria-pressed={isActive}
                  onClick={() => setSelectedFilter(filterOption.id)}
                >
                  {filterOption.label}
                </LikedVideosFilterButton>
              );
            })}
          </LikedVideosFilterBar>

          {filteredLikedVideos.length === 0 ? (
            <LikedVideosStatusPanel>
              <LikedVideosStatusMessage>
                {selectedFilter === 'shorts'
                  ? 'No liked Shorts found.'
                  : 'No liked videos found.'}
              </LikedVideosStatusMessage>
            </LikedVideosStatusPanel>
          ) : selectedFilter === 'shorts' ? (
            <LikedShortsGrid>
              {filteredLikedVideos.map((likedVideo) => (
                <LikedShortItem
                  key={likedVideo.id}
                  likedVideo={likedVideo}
                  isRemoving={isLikeMutating(likedVideo.id)}
                  onVideoSelect={onVideoSelect}
                  onRemove={handleRemove}
                />
              ))}
            </LikedShortsGrid>
          ) : (
            <LikedVideosList>
              {filteredLikedVideos.map((likedVideo) => (
                <LikedVideoItem
                  key={likedVideo.id}
                  likedVideo={likedVideo}
                  isRemoving={isLikeMutating(likedVideo.id)}
                  onVideoSelect={onVideoSelect}
                  onRemove={handleRemove}
                />
              ))}
            </LikedVideosList>
          )}
        </LikedVideosContent>
      </LikedVideosLayout>
    </LikedVideosPage>
  );
};

export default LikedVideosView;
