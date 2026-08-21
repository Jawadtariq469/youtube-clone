import { useEffect, useRef, useState } from 'react';

import { MoreVerticalIcon, TrashIcon } from '../../components/icons';

import { useTheme } from '../../store/global';

import {
  formatPublishedAt,
  formatViewCount,
} from '../../utils/videoFormatters';

import {
  WatchLaterShortActionMenu,
  WatchLaterShortCard,
  WatchLaterShortDetails,
  WatchLaterShortDuration,
  WatchLaterShortMenuContainer,
  WatchLaterShortMetadata,
  WatchLaterShortMoreButton,
  WatchLaterShortThumbnail,
  WatchLaterShortThumbnailButton,
  WatchLaterShortThumbnailContainer,
  WatchLaterShortTitle,
  WatchLaterShortTitleButton,
  WatchLaterVideoActionIcon,
  WatchLaterVideoActionMenuButton,
} from './watchLater.styles';

import type { WatchLaterShortItemProps } from './types';

const WatchLaterShortItem = ({
  watchLaterVideo,
  isRemoving = false,
  onVideoSelect,
  onRemove,
}: WatchLaterShortItemProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const actionsRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

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

  const handleRemove = (): void => {
    setIsActionsOpen(false);

    onRemove(watchLaterVideo.id);
  };

  const publishedAt = formatPublishedAt(watchLaterVideo.publishedAt);

  return (
    <WatchLaterShortCard>
      <WatchLaterShortThumbnailButton
        type="button"
        $appTheme={theme}
        aria-label={`Watch ${watchLaterVideo.title}`}
        onClick={() => onVideoSelect(watchLaterVideo.id)}
      >
        <WatchLaterShortThumbnailContainer>
          <WatchLaterShortThumbnail
            src={watchLaterVideo.thumbnailUrl}
            alt={`Thumbnail for ${watchLaterVideo.title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {watchLaterVideo.duration && (
            <WatchLaterShortDuration>
              {watchLaterVideo.duration}
            </WatchLaterShortDuration>
          )}
        </WatchLaterShortThumbnailContainer>
      </WatchLaterShortThumbnailButton>

      <WatchLaterShortDetails>
        <WatchLaterShortTitleButton
          type="button"
          $appTheme={theme}
          onClick={() => onVideoSelect(watchLaterVideo.id)}
        >
          <WatchLaterShortTitle>{watchLaterVideo.title}</WatchLaterShortTitle>
        </WatchLaterShortTitleButton>

        <WatchLaterShortMenuContainer ref={actionsRef}>
          <WatchLaterShortMoreButton
            type="button"
            $appTheme={theme}
            disabled={isRemoving}
            aria-label={`More actions for ${watchLaterVideo.title}`}
            aria-haspopup="menu"
            aria-expanded={isActionsOpen}
            onClick={() => setIsActionsOpen((isOpen) => !isOpen)}
          >
            <MoreVerticalIcon />
          </WatchLaterShortMoreButton>

          {isActionsOpen && (
            <WatchLaterShortActionMenu $appTheme={theme} role="menu">
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
            </WatchLaterShortActionMenu>
          )}
        </WatchLaterShortMenuContainer>
      </WatchLaterShortDetails>

      <WatchLaterShortMetadata>
        {watchLaterVideo.channelTitle}
        {' • '}
        {formatViewCount(watchLaterVideo.viewCount)} views
        {publishedAt && ` • ${publishedAt}`}
      </WatchLaterShortMetadata>
    </WatchLaterShortCard>
  );
};

export default WatchLaterShortItem;
