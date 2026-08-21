import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';

import { VideoPlayer } from '../../components/ui';
import { AppConstants, AppQueryParameters } from '../../constants';

import { useMediaQuery } from '../../hooks/useMediaQuerry';
import { useVideoDetails } from '../../hooks/useVideoDetails';

import { useAppSelector } from '../../store/global';

import { selectHistoryItems, useRecordWatchHistory } from '../../store/history';

import WatchComments from './WatchComments';
import WatchInformation from './WatchInformation';
import WatchRecommendations from './WatchRecommendations';

import {
  CommentsColumn,
  PrimaryColumn,
  RecommendationsColumn,
  StatusMessage,
  WatchLayout,
  WatchPage,
} from './watchView.styles';

import type { UIEvent as ReactUIEvent } from 'react';
import type { WatchViewProps } from './types';

const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

const STACKED_LAYOUT_QUERY = '(max-width: 1100px)';

const WHEEL_LINE_HEIGHT = 16;

const getMaximumScrollTop = (element: HTMLElement): number => {
  return Math.max(0, element.scrollHeight - element.clientHeight);
};

const clampScrollProgress = (
  progress: number,
  maximumProgress: number,
): number => {
  return Math.min(Math.max(progress, 0), maximumProgress);
};

const WatchView = ({
  autoPlay = true,
  onVideoSelect,
  onChannelSelect,
}: WatchViewProps) => {
  const [searchParameters] = useSearchParams();

  const watchLayoutRef = useRef<HTMLDivElement | null>(null);

  const primaryColumnRef = useRef<HTMLDivElement | null>(null);

  const recommendationsColumnRef = useRef<HTMLDivElement | null>(null);

  const isApplyingSynchronizedScrollRef = useRef(false);

  const synchronizationFrameRef = useRef<number | null>(null);

  const isStackedLayout = useMediaQuery(STACKED_LAYOUT_QUERY);

  const videoId =
    searchParameters.get(AppQueryParameters.VideoId)?.trim() ??
    AppConstants.EmptyString;

  const isValidVideoId = VIDEO_ID_PATTERN.test(videoId);

  const {
    data: video,
    isPending,
    isError,
    error,
  } = useVideoDetails(isValidVideoId ? videoId : AppConstants.EmptyString);

  const historyItems = useAppSelector(selectHistoryItems);

  const historyVideo = historyItems.find(
    (historyItem) => historyItem.id === videoId,
  );

  /*
   * Use History information while fresh video
   * details are loading or temporarily unavailable.
   */
  const resolvedVideo = video ?? historyVideo;

  const isVideoInformationLoading = isPending && !resolvedVideo;

  const isVideoInformationError = isError && !resolvedVideo;

  useRecordWatchHistory(resolvedVideo);

  const shouldDisplayComments =
    !isVideoInformationLoading &&
    !isVideoInformationError &&
    Boolean(resolvedVideo);

  const applySynchronizedScroll = useCallback((progress: number): void => {
    const primaryColumn = primaryColumnRef.current;

    const recommendationsColumn = recommendationsColumnRef.current;

    if (!primaryColumn || !recommendationsColumn) {
      return;
    }

    const primaryMaximumScrollTop = getMaximumScrollTop(primaryColumn);

    const recommendationsMaximumScrollTop = getMaximumScrollTop(
      recommendationsColumn,
    );

    isApplyingSynchronizedScrollRef.current = true;

    /*
     * Both columns receive the same progress.
     *
     * When one column reaches its maximum,
     * it stays there while the longer column
     * continues scrolling.
     */
    primaryColumn.scrollTop = Math.min(progress, primaryMaximumScrollTop);

    recommendationsColumn.scrollTop = Math.min(
      progress,
      recommendationsMaximumScrollTop,
    );

    if (synchronizationFrameRef.current !== null) {
      window.cancelAnimationFrame(synchronizationFrameRef.current);
    }

    synchronizationFrameRef.current = window.requestAnimationFrame(() => {
      isApplyingSynchronizedScrollRef.current = false;

      synchronizationFrameRef.current = null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (synchronizationFrameRef.current !== null) {
        window.cancelAnimationFrame(synchronizationFrameRef.current);
      }
    };
  }, []);

  /*
   * Desktop synchronized wheel scrolling.
   */
  useEffect(() => {
    const watchLayout = watchLayoutRef.current;

    if (!watchLayout || isStackedLayout) {
      return;
    }

    const handleWatchLayoutWheel = (event: WheelEvent): void => {
      /*
       * Do not interfere with browser zoom or
       * horizontal trackpad scrolling.
       */
      if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      const primaryColumn = primaryColumnRef.current;

      const recommendationsColumn = recommendationsColumnRef.current;

      if (!primaryColumn || !recommendationsColumn) {
        return;
      }

      const primaryMaximumScrollTop = getMaximumScrollTop(primaryColumn);

      const recommendationsMaximumScrollTop = getMaximumScrollTop(
        recommendationsColumn,
      );

      const maximumProgress = Math.max(
        primaryMaximumScrollTop,
        recommendationsMaximumScrollTop,
      );

      /*
       * The longer column represents the current
       * shared scrolling progress.
       */
      const currentProgress = Math.max(
        primaryColumn.scrollTop,
        recommendationsColumn.scrollTop,
      );

      const wheelDelta =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? event.deltaY * WHEEL_LINE_HEIGHT
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? event.deltaY * primaryColumn.clientHeight
            : event.deltaY;

      const nextProgress = clampScrollProgress(
        currentProgress + wheelDelta,
        maximumProgress,
      );

      if (nextProgress === currentProgress) {
        return;
      }

      event.preventDefault();

      applySynchronizedScroll(nextProgress);
    };

    watchLayout.addEventListener('wheel', handleWatchLayoutWheel, {
      passive: false,
    });

    return () => {
      watchLayout.removeEventListener('wheel', handleWatchLayoutWheel);
    };
  }, [applySynchronizedScroll, isStackedLayout, videoId]);

  /*
   * Keeps both columns synchronized when the
   * scrollbar, keyboard, or iframe causes scrolling.
   */
  const handleColumnScroll = (event: ReactUIEvent<HTMLDivElement>): void => {
    if (isStackedLayout || isApplyingSynchronizedScrollRef.current) {
      return;
    }

    applySynchronizedScroll(event.currentTarget.scrollTop);
  };

  if (!videoId) {
    return <StatusMessage>No video was selected.</StatusMessage>;
  }

  if (!isValidVideoId) {
    return <StatusMessage>The video ID is invalid.</StatusMessage>;
  }

  return (
    <WatchPage>
      <WatchLayout ref={watchLayoutRef} key={videoId}>
        <PrimaryColumn ref={primaryColumnRef} onScroll={handleColumnScroll}>
          <VideoPlayer
            videoId={videoId}
            title={resolvedVideo?.title ?? 'YouTube video'}
            autoPlay={autoPlay}
          />

          <WatchInformation
            video={resolvedVideo}
            isLoading={isVideoInformationLoading}
            isError={isVideoInformationError}
            error={error}
            onChannelSelect={onChannelSelect}
          />

          {!isStackedLayout && shouldDisplayComments && resolvedVideo && (
            <WatchComments key={resolvedVideo.id} videoId={resolvedVideo.id} />
          )}
        </PrimaryColumn>

        <RecommendationsColumn
          ref={recommendationsColumnRef}
          onScroll={handleColumnScroll}
        >
          <WatchRecommendations
            video={resolvedVideo}
            currentVideoId={videoId}
            isVideoLoading={isVideoInformationLoading}
            onVideoSelect={onVideoSelect}
          />
        </RecommendationsColumn>

        {isStackedLayout && shouldDisplayComments && resolvedVideo && (
          <CommentsColumn>
            <WatchComments key={resolvedVideo.id} videoId={resolvedVideo.id} />
          </CommentsColumn>
        )}
      </WatchLayout>
    </WatchPage>
  );
};

export default WatchView;
