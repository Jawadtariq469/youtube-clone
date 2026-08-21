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
  LikedShortActionMenu,
  LikedShortContainer,
  LikedShortInformation,
  LikedShortInformationRow,
  LikedShortMetadata,
  LikedShortTextButton,
  LikedShortThumbnail,
  LikedShortThumbnailButton,
  LikedShortThumbnailContainer,
  LikedShortTitle,
  LikedVideoActionIcon,
  LikedVideoActionMenuButton,
  LikedVideoActions,
  LikedVideoMoreButton,
} from './likedVideos.styles';

import type { LikedShortItemProps } from './types';

const LikedShortItem = ({
  likedVideo,
  isRemoving = false,
  onVideoSelect,
  onRemove,
}: LikedShortItemProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const actionsRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  const { downloadVideo, isDownloaded, removeDownload } = useDownloads();

  const videoIsDownloaded = isDownloaded(likedVideo.id);

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
    onVideoSelect(likedVideo.id);
  };

  const handleDownloadToggle = (): void => {
    if (videoIsDownloaded) {
      removeDownload(likedVideo.id);
    } else {
      downloadVideo(likedVideo);
    }

    setIsActionsOpen(false);
  };

  const handleShare = async (): Promise<void> => {
    const searchParameters = new URLSearchParams({
      [AppQueryParameters.VideoId]: likedVideo.id,
    });

    const videoUrl =
      `${window.location.origin}${AppRoutes.Watch}` +
      `?${searchParameters.toString()}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: likedVideo.title,
          url: videoUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(videoUrl);
      }
    } catch {
      // Closing the native share dialog is not an application error.
    } finally {
      setIsActionsOpen(false);
    }
  };

  const handleRemove = (): void => {
    if (isRemoving) {
      return;
    }

    setIsActionsOpen(false);

    onRemove(likedVideo.id);
  };

  const publishedAt = formatPublishedAt(likedVideo.publishedAt);

  return (
    <LikedShortContainer>
      <LikedShortThumbnailButton
        type="button"
        $appTheme={theme}
        aria-label={`Watch ${likedVideo.title}`}
        onClick={handleVideoSelect}
      >
        <LikedShortThumbnailContainer>
          <LikedShortThumbnail
            src={likedVideo.thumbnailUrl}
            alt={`Thumbnail for ${likedVideo.title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </LikedShortThumbnailContainer>
      </LikedShortThumbnailButton>

      <LikedShortInformationRow>
        <LikedShortTextButton
          type="button"
          $appTheme={theme}
          onClick={handleVideoSelect}
        >
          <LikedShortInformation>
            <LikedShortTitle>{likedVideo.title}</LikedShortTitle>

            <LikedShortMetadata>
              {formatViewCount(likedVideo.viewCount)} views
              {publishedAt && ` • ${publishedAt}`}
            </LikedShortMetadata>
          </LikedShortInformation>
        </LikedShortTextButton>

        <LikedVideoActions ref={actionsRef}>
          <LikedVideoMoreButton
            type="button"
            $appTheme={theme}
            aria-label={`More actions for ${likedVideo.title}`}
            aria-haspopup="menu"
            aria-expanded={isActionsOpen}
            onClick={() => setIsActionsOpen((isOpen) => !isOpen)}
          >
            <MoreVerticalIcon />
          </LikedVideoMoreButton>

          {isActionsOpen && (
            <LikedShortActionMenu $appTheme={theme} role="menu">
              <LikedVideoActionMenuButton
                type="button"
                $appTheme={theme}
                role="menuitem"
                onClick={handleDownloadToggle}
              >
                <LikedVideoActionIcon>
                  <DownloadIcon />
                </LikedVideoActionIcon>

                {videoIsDownloaded ? 'Remove download' : 'Download'}
              </LikedVideoActionMenuButton>

              <LikedVideoActionMenuButton
                type="button"
                $appTheme={theme}
                role="menuitem"
                onClick={() => {
                  void handleShare();
                }}
              >
                <LikedVideoActionIcon>
                  <ShareOutlineIcon />
                </LikedVideoActionIcon>
                Share
              </LikedVideoActionMenuButton>

              <LikedVideoActionMenuButton
                type="button"
                $appTheme={theme}
                $isDanger
                role="menuitem"
                disabled={isRemoving}
                onClick={handleRemove}
              >
                <LikedVideoActionIcon>
                  <TrashIcon />
                </LikedVideoActionIcon>

                {isRemoving ? 'Removing...' : 'Remove from liked videos'}
              </LikedVideoActionMenuButton>
            </LikedShortActionMenu>
          )}
        </LikedVideoActions>
      </LikedShortInformationRow>
    </LikedShortContainer>
  );
};

export default LikedShortItem;
