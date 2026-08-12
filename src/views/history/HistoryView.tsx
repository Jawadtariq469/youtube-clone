import { Button } from '../../components/elements';

import { VideoGridShimmer } from '../../components/ui';

import { useAuth } from '../../store/auth';

import { useWatchHistory } from '../../store/history';

import { ButtonHtmlType, ButtonSize, ButtonVariant } from '../../utils/enums';

import HistoryVideoItem from './HistoryVideoItem';

import {
  HistoryGrid,
  HistoryHeader,
  HistoryPage,
  HistoryStatusMessage,
  HistoryStatusPanel,
  HistorySubtitle,
  HistoryTitle,
  HistoryTitleGroup,
} from './historyView.styles';

import type { HistoryViewProps } from './types';

const HistoryView = ({ onVideoSelect }: HistoryViewProps) => {
  const {
    user,
    isLoading: isAuthLoading,
    isInitialized: isAuthInitialized,
    signInWithGoogle,
  } = useAuth();

  const {
    items,
    isLoading: isHistoryLoading,
    isMutating,
    error,
    removeVideo,
    clearHistory,
  } = useWatchHistory();

  const handleSignIn = (): void => {
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

  if (!isAuthInitialized || isAuthLoading) {
    return <VideoGridShimmer />;
  }

  if (!user) {
    return (
      <HistoryPage>
        <HistoryHeader>
          <HistoryTitleGroup>
            <HistoryTitle>Watch history</HistoryTitle>
          </HistoryTitleGroup>
        </HistoryHeader>

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
      </HistoryPage>
    );
  }

  return (
    <HistoryPage>
      <HistoryHeader>
        <HistoryTitleGroup>
          <HistoryTitle>Watch history</HistoryTitle>

          <HistorySubtitle>
            {items.length} {items.length === 1 ? 'video' : 'videos'}
          </HistorySubtitle>
        </HistoryTitleGroup>

        {items.length > 0 && (
          <Button
            type={ButtonHtmlType.Button}
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Medium}
            disabled={isMutating}
            onClick={handleClearHistory}
          >
            {isMutating ? 'Updating...' : 'Clear all history'}
          </Button>
        )}
      </HistoryHeader>

      {isHistoryLoading && <VideoGridShimmer />}

      {!isHistoryLoading && error && (
        <HistoryStatusMessage>{error}</HistoryStatusMessage>
      )}

      {!isHistoryLoading && !error && items.length === 0 && (
        <HistoryStatusMessage>
          Videos you watch will appear here.
        </HistoryStatusMessage>
      )}

      {!isHistoryLoading && items.length > 0 && (
        <HistoryGrid>
          {items.map((historyItem) => (
            <HistoryVideoItem
              key={historyItem.id}
              historyItem={historyItem}
              isRemoving={isMutating}
              onVideoSelect={onVideoSelect}
              onRemove={handleRemove}
            />
          ))}
        </HistoryGrid>
      )}
    </HistoryPage>
  );
};

export default HistoryView;
