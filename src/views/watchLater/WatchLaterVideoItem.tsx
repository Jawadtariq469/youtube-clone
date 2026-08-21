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
  WatchLaterVideoActionIcon,
  WatchLaterVideoActionMenu,
  WatchLaterVideoActionMenuButton,
  WatchLaterVideoActions,
  WatchLaterVideoButton,
  WatchLaterVideoContainer,
  WatchLaterVideoDuration,
  WatchLaterVideoInformation,
  WatchLaterVideoMetadata,
  WatchLaterVideoMoreButton,
  WatchLaterVideoThumbnail,
  WatchLaterVideoThumbnailContainer,
  WatchLaterVideoTitle,
} from './watchLater.styles';

import type { WatchLaterVideoItemProps } from './types';

const WatchLaterVideoItem = ({
  watchLaterVideo,
  isRemoving = false,
  onVideoSelect,
  onRemove,
}: WatchLaterVideoItemProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const actionsRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  const { downloadVideo, isDownloaded, removeDownload } = useDownloads();

  const videoIsDownloaded = isDownloaded(watchLaterVideo.id);

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

  const handleDownloadToggle = (): void => {
    if (videoIsDownloaded) {
      removeDownload(watchLaterVideo.id);
    } else {
      downloadVideo(watchLaterVideo);
    }

    setIsActionsOpen(false);
  };

  const handleShare = async (): Promise<void> => {
    const searchParameters = new URLSearchParams({
      [AppQueryParameters.VideoId]: watchLaterVideo.id,
    });

    const videoUrl =
      `${window.location.origin}` +
      `${AppRoutes.Watch}?` +
      searchParameters.toString();

    try {
      if (navigator.share) {
        await navigator.share({
          title: watchLaterVideo.title,
          url: videoUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(videoUrl);
      }
    } catch {
      // Closing the share window is not an error.
    } finally {
      setIsActionsOpen(false);
    }
  };

  const handleRemove = (): void => {
    setIsActionsOpen(false);

    onRemove(watchLaterVideo.id);
  };

  const publishedAt = formatPublishedAt(watchLaterVideo.publishedAt);

  return (
    <WatchLaterVideoContainer $appTheme={theme}>
      <WatchLaterVideoButton
        type="button"
        $appTheme={theme}
        aria-label={`Watch ${watchLaterVideo.title}`}
        onClick={() => onVideoSelect(watchLaterVideo.id)}
      >
        <WatchLaterVideoThumbnailContainer>
          <WatchLaterVideoThumbnail
            src={watchLaterVideo.thumbnailUrl}
            alt={`Thumbnail for ${watchLaterVideo.title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {watchLaterVideo.duration && (
            <WatchLaterVideoDuration>
              {watchLaterVideo.duration}
            </WatchLaterVideoDuration>
          )}
        </WatchLaterVideoThumbnailContainer>

        <WatchLaterVideoInformation>
          <WatchLaterVideoTitle>{watchLaterVideo.title}</WatchLaterVideoTitle>

          <WatchLaterVideoMetadata>
            {watchLaterVideo.channelTitle}
            {' • '}
            {formatViewCount(watchLaterVideo.viewCount)} views
            {publishedAt && ` • ${publishedAt}`}
          </WatchLaterVideoMetadata>
        </WatchLaterVideoInformation>
      </WatchLaterVideoButton>

      <WatchLaterVideoActions ref={actionsRef}>
        <WatchLaterVideoMoreButton
          type="button"
          $appTheme={theme}
          disabled={isRemoving}
          aria-label={`More actions for ${watchLaterVideo.title}`}
          aria-haspopup="menu"
          aria-expanded={isActionsOpen}
          onClick={() => setIsActionsOpen((isOpen) => !isOpen)}
        >
          <MoreVerticalIcon />
        </WatchLaterVideoMoreButton>

        {isActionsOpen && (
          <WatchLaterVideoActionMenu $appTheme={theme} role="menu">
            <WatchLaterVideoActionMenuButton
              type="button"
              $appTheme={theme}
              role="menuitem"
              onClick={handleDownloadToggle}
            >
              <WatchLaterVideoActionIcon>
                <DownloadIcon />
              </WatchLaterVideoActionIcon>

              {videoIsDownloaded ? 'Remove download' : 'Download'}
            </WatchLaterVideoActionMenuButton>

            <WatchLaterVideoActionMenuButton
              type="button"
              $appTheme={theme}
              role="menuitem"
              onClick={() => {
                void handleShare();
              }}
            >
              <WatchLaterVideoActionIcon>
                <ShareOutlineIcon />
              </WatchLaterVideoActionIcon>
              Share
            </WatchLaterVideoActionMenuButton>

            <WatchLaterVideoActionMenuButton
              type="button"
              $appTheme={theme}
              $isDanger
              role="menuitem"
              disabled={isRemoving}
              onClick={handleRemove}
            >
              <WatchLaterVideoActionIcon>
                <TrashIcon />
              </WatchLaterVideoActionIcon>

              {isRemoving ? 'Removing...' : 'Remove from Watch Later'}
            </WatchLaterVideoActionMenuButton>
          </WatchLaterVideoActionMenu>
        )}
      </WatchLaterVideoActions>
    </WatchLaterVideoContainer>
  );
};

export default WatchLaterVideoItem;
