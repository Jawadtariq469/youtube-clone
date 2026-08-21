import { useEffect, useRef, useState } from 'react';

import {
  DownloadIcon,
  MoreVerticalIcon,
  PlayFilledIcon,
  ShuffleIcon,
  TrashIcon,
} from '../../components/icons';

import { useTheme } from '../../store/global';

import { formatWatchLaterUpdatedDate } from './watchLaterUtils';

import {
  SummaryBackgroundImage,
  SummaryContent,
  SummaryIconActions,
  SummaryIconButton,
  SummaryInformation,
  SummaryMenuContainer,
  SummaryMetadata,
  SummaryMoreMenu,
  SummaryMoreMenuButton,
  SummaryOverlay,
  SummaryOwner,
  SummaryPrimaryActions,
  SummaryPrimaryButton,
  SummaryThumbnail,
  SummaryThumbnailContainer,
  SummaryTitle,
  WatchLaterSummaryCard,
} from './watchLater.styles';

import type { WatchLaterSummaryProps } from './types';

const WatchLaterSummary = ({
  videos,
  userName,
  onPlayAll,
  onShuffle,
  onDownloadAll,
  onClearAll,
}: WatchLaterSummaryProps) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  const coverVideo = videos[0];

  useEffect(() => {
    if (!isMoreMenuOpen) {
      return;
    }

    const handleOutsidePointerDown = (event: PointerEvent): void => {
      if (
        event.target instanceof Node &&
        !menuRef.current?.contains(event.target)
      ) {
        setIsMoreMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown);

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointerDown);

      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMoreMenuOpen]);

  if (!coverVideo) {
    return null;
  }

  const handleClearAll = (): void => {
    setIsMoreMenuOpen(false);

    onClearAll();
  };

  return (
    <WatchLaterSummaryCard $appTheme={theme}>
      <SummaryBackgroundImage
        src={coverVideo.thumbnailUrl}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
      />

      <SummaryOverlay />

      <SummaryContent>
        <SummaryThumbnailContainer>
          <SummaryThumbnail
            src={coverVideo.thumbnailUrl}
            alt="Watch Later playlist cover"
            referrerPolicy="no-referrer"
          />
        </SummaryThumbnailContainer>

        <SummaryInformation>
          <SummaryTitle>Watch Later</SummaryTitle>

          <SummaryOwner>{userName || 'You'}</SummaryOwner>

          <SummaryMetadata>
            {videos.length} {videos.length === 1 ? 'video' : 'videos'}
            {' • '}
            No views
            {' • '}
            Private
          </SummaryMetadata>

          <SummaryMetadata>
            {formatWatchLaterUpdatedDate(coverVideo.savedAt)}
          </SummaryMetadata>

          <SummaryIconActions>
            <SummaryIconButton
              type="button"
              aria-label="Download every Watch Later video"
              title="Download all"
              onClick={onDownloadAll}
            >
              <DownloadIcon />
            </SummaryIconButton>

            <SummaryMenuContainer ref={menuRef}>
              <SummaryIconButton
                type="button"
                aria-label="More Watch Later actions"
                aria-haspopup="menu"
                aria-expanded={isMoreMenuOpen}
                onClick={() => setIsMoreMenuOpen((isOpen) => !isOpen)}
              >
                <MoreVerticalIcon />
              </SummaryIconButton>

              {isMoreMenuOpen && (
                <SummaryMoreMenu role="menu">
                  <SummaryMoreMenuButton
                    type="button"
                    role="menuitem"
                    onClick={handleClearAll}
                  >
                    <TrashIcon />
                    Remove all from Watch Later
                  </SummaryMoreMenuButton>
                </SummaryMoreMenu>
              )}
            </SummaryMenuContainer>
          </SummaryIconActions>

          <SummaryPrimaryActions>
            <SummaryPrimaryButton type="button" $isPrimary onClick={onPlayAll}>
              <PlayFilledIcon />
              Play all
            </SummaryPrimaryButton>

            <SummaryPrimaryButton type="button" onClick={onShuffle}>
              <ShuffleIcon />
              Shuffle
            </SummaryPrimaryButton>
          </SummaryPrimaryActions>
        </SummaryInformation>
      </SummaryContent>
    </WatchLaterSummaryCard>
  );
};

export default WatchLaterSummary;
