import { useEffect, useRef, useState } from 'react';

import {
  DownloadIcon,
  MoreVerticalIcon,
  ShareOutlineIcon,
  TrashIcon,
} from '../../components/icons';
import { AppQueryParameters, AppRoutes } from '../../constants';
import { useDownloads } from '../../store/downloads';
import { useTheme } from '../../store/global';
import {
  formatPublishedAt,
  formatViewCount,
} from '../../utils/videoFormatters';

import {
  HistoryActionIcon,
  HistoryActionMenu,
  HistoryActionMenuButton,
  HistoryActions,
  HistoryDuration,
  HistoryMetadata,
  HistoryMoreButton,
  HistoryThumbnail,
  HistoryThumbnailContainer,
  HistoryVideoButton,
  HistoryVideoContainer,
  HistoryVideoDescription,
  HistoryVideoInformation,
  HistoryVideoTitle,
} from './historyView.styles';

import type { HistoryVideoItemProps } from './types';

const HistoryVideoItem = ({
  historyItem,
  isRemoving = false,
  onVideoSelect,
  onRemove,
}: HistoryVideoItemProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const actionsRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  const { downloadVideo, isDownloaded, removeDownload } = useDownloads();

  const videoIsDownloaded = isDownloaded(historyItem.id);

  useEffect(() => {
    if (!isActionsOpen) {
      return;
    }

    const handleOutsidePointerDown = (event: PointerEvent): void => {
      if (
        event.target instanceof Node &&
        !actionsRef.current?.contains(event.target)
      ) {
        setIsActionsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsActionsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointerDown);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isActionsOpen]);

  const handleVideoSelect = (): void => {
    onVideoSelect(historyItem.id);
  };

  const handleDownloadToggle = (): void => {
    if (videoIsDownloaded) {
      removeDownload(historyItem.id);
    } else {
      downloadVideo(historyItem);
    }

    setIsActionsOpen(false);
  };

  const handleShare = async (): Promise<void> => {
    const searchParameters = new URLSearchParams({
      [AppQueryParameters.VideoId]: historyItem.id,
    });

    const videoUrl = `${window.location.origin}${AppRoutes.Watch}?${searchParameters.toString()}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: historyItem.title,
          url: videoUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(videoUrl);
      }
    } catch {
      // Closing the native share dialog should not show an application error.
    } finally {
      setIsActionsOpen(false);
    }
  };

  const handleRemove = (): void => {
    setIsActionsOpen(false);
    onRemove(historyItem.id);
  };

  const publishedAt = formatPublishedAt(historyItem.publishedAt);

  return (
    <HistoryVideoContainer $appTheme={theme}>
      <HistoryVideoButton
        type="button"
        $appTheme={theme}
        aria-label={`Watch ${historyItem.title}`}
        onClick={handleVideoSelect}
      >
        <HistoryThumbnailContainer>
          <HistoryThumbnail
            src={historyItem.thumbnailUrl}
            alt={`Thumbnail for ${historyItem.title}`}
            loading="lazy"
          />

          {historyItem.duration && (
            <HistoryDuration>{historyItem.duration}</HistoryDuration>
          )}
        </HistoryThumbnailContainer>

        <HistoryVideoInformation>
          <HistoryVideoTitle>{historyItem.title}</HistoryVideoTitle>

          <HistoryMetadata>
            {historyItem.channelTitle}
            {' • '}
            {formatViewCount(historyItem.viewCount)} views
            {publishedAt && ` • ${publishedAt}`}
          </HistoryMetadata>

          {historyItem.description && (
            <HistoryVideoDescription>
              {historyItem.description}
            </HistoryVideoDescription>
          )}
        </HistoryVideoInformation>
      </HistoryVideoButton>

      <HistoryActions ref={actionsRef}>
        <HistoryMoreButton
          type="button"
          $appTheme={theme}
          aria-label={`More actions for ${historyItem.title}`}
          aria-haspopup="menu"
          aria-expanded={isActionsOpen}
          onClick={() => setIsActionsOpen((isOpen) => !isOpen)}
        >
          <MoreVerticalIcon />
        </HistoryMoreButton>

        {isActionsOpen && (
          <HistoryActionMenu $appTheme={theme} role="menu">
            <HistoryActionMenuButton
              type="button"
              $appTheme={theme}
              role="menuitem"
              onClick={handleDownloadToggle}
            >
              <HistoryActionIcon>
                <DownloadIcon />
              </HistoryActionIcon>

              {videoIsDownloaded ? 'Remove download' : 'Download'}
            </HistoryActionMenuButton>

            <HistoryActionMenuButton
              type="button"
              $appTheme={theme}
              role="menuitem"
              onClick={() => {
                void handleShare();
              }}
            >
              <HistoryActionIcon>
                <ShareOutlineIcon />
              </HistoryActionIcon>
              Share
            </HistoryActionMenuButton>

            <HistoryActionMenuButton
              type="button"
              $appTheme={theme}
              $isDanger
              role="menuitem"
              disabled={isRemoving}
              onClick={handleRemove}
            >
              <HistoryActionIcon>
                <TrashIcon />
              </HistoryActionIcon>
              Remove from watch history
            </HistoryActionMenuButton>
          </HistoryActionMenu>
        )}
      </HistoryActions>
    </HistoryVideoContainer>
  );
};

export default HistoryVideoItem;
