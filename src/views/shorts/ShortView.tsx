import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { useSearchParams } from 'react-router';

import { ShortVideo, ShortVideoSkeleton } from '../../components/ui';

import { AppQueryParameters } from '../../constants';

import { useInfiniteShortVideos } from '../../hooks/useInfiniteShortVideos';

import { useVideoDetails } from '../../hooks/useVideoDetails';

import { useTheme } from '../../store/global';

import {
  ShortsFeed,
  ShortsLoadError,
  ShortsPage,
  ShortsStatusMessage,
  ShortsStatusPanel,
} from './shortView.styles';

import { persistActiveShortVideoId, readActiveShortVideoId } from './storage';

import type { Video } from '../../utils/types';

import type { ShortsViewProps } from './types';

const ACTIVE_VIDEO_THRESHOLD = 0.65;

const LOAD_AHEAD_VIDEO_COUNT = 4;

const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

const getUniqueVideos = (videos: readonly Video[]): Video[] => {
  const uniqueVideos: Video[] = [];

  const usedVideoIds = new Set<string>();

  for (const video of videos) {
    if (usedVideoIds.has(video.id)) {
      continue;
    }

    usedVideoIds.add(video.id);

    uniqueVideos.push(video);
  }

  return uniqueVideos;
};

const ShortsView = ({ onVideoSelect }: ShortsViewProps) => {
  const [searchParameters] = useSearchParams();

  const requestedVideoId =
    searchParameters.get(AppQueryParameters.VideoId)?.trim() ?? '';

  const sharedVideoId = VIDEO_ID_PATTERN.test(requestedVideoId)
    ? requestedVideoId
    : '';

  const feedContainerRef = useRef<HTMLDivElement | null>(null);

  const lastRequestedPageCountRef = useRef(0);

  const hasRestoredActiveVideoRef = useRef(false);

  const [savedActiveVideoId] = useState<string | null>(() => {
    return sharedVideoId || readActiveShortVideoId();
  });

  const [observedActiveVideoId, setObservedActiveVideoId] = useState<
    string | null
  >(savedActiveVideoId);

  const { theme } = useTheme();

  const { data: sharedVideo, isPending: isSharedVideoPending } =
    useVideoDetails(sharedVideoId);

  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
  } = useInfiniteShortVideos();

  const videos = useMemo(() => {
    const fetchedVideos = data?.pages.flatMap((page) => page.videos) ?? [];

    return getUniqueVideos([
      ...(sharedVideo ? [sharedVideo] : []),

      ...fetchedVideos,
    ]);
  }, [data, sharedVideo]);

  const isObservedVideoAvailable = observedActiveVideoId
    ? videos.some((video) => video.id === observedActiveVideoId)
    : false;

  const activeVideoId = isObservedVideoAvailable
    ? observedActiveVideoId
    : (videos[0]?.id ?? null);

  const activeVideoIndex = videos.findIndex(
    (video) => video.id === activeVideoId,
  );

  const pageCount = data?.pages.length ?? 0;

  useLayoutEffect(() => {
    const feedContainer = feedContainerRef.current;

    if (hasRestoredActiveVideoRef.current || !feedContainer || !activeVideoId) {
      return;
    }

    const activeShortSlide = Array.from(
      feedContainer.querySelectorAll<HTMLElement>('[data-short-video-id]'),
    ).find((shortSlide) => shortSlide.dataset.shortVideoId === activeVideoId);

    if (!activeShortSlide) {
      return;
    }

    const feedContainerTop = feedContainer.getBoundingClientRect().top;

    const activeShortTop = activeShortSlide.getBoundingClientRect().top;

    const previousScrollBehavior = feedContainer.style.scrollBehavior;

    feedContainer.style.scrollBehavior = 'auto';

    feedContainer.scrollTo({
      top: feedContainer.scrollTop + activeShortTop - feedContainerTop,

      behavior: 'auto',
    });

    persistActiveShortVideoId(activeVideoId);

    hasRestoredActiveVideoRef.current = true;

    const animationFrameId = window.requestAnimationFrame(() => {
      feedContainer.style.scrollBehavior = previousScrollBehavior;
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);

      feedContainer.style.scrollBehavior = previousScrollBehavior;
    };
  }, [activeVideoId, videos]);

  useEffect(() => {
    const feedContainer = feedContainerRef.current;

    if (!feedContainer || videos.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisibleEntry: IntersectionObserverEntry | undefined;

        for (const entry of entries) {
          if (
            !entry.isIntersecting ||
            entry.intersectionRatio < ACTIVE_VIDEO_THRESHOLD
          ) {
            continue;
          }

          if (
            !mostVisibleEntry ||
            entry.intersectionRatio > mostVisibleEntry.intersectionRatio
          ) {
            mostVisibleEntry = entry;
          }
        }

        const nextActiveVideoId = (
          mostVisibleEntry?.target as HTMLElement | undefined
        )?.dataset.shortVideoId;

        if (nextActiveVideoId) {
          persistActiveShortVideoId(nextActiveVideoId);

          setObservedActiveVideoId(nextActiveVideoId);
        }
      },
      {
        root: feedContainer,

        threshold: [ACTIVE_VIDEO_THRESHOLD, 0.8, 0.95],
      },
    );

    const shortSlides = feedContainer.querySelectorAll<HTMLElement>(
      '[data-short-video-id]',
    );

    shortSlides.forEach((shortSlide) => {
      observer.observe(shortSlide);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  useEffect(() => {
    const loadMorePosition = videos.length - LOAD_AHEAD_VIDEO_COUNT;

    const shouldLoadMore =
      activeVideoIndex >= Math.max(0, loadMorePosition) &&
      Boolean(hasNextPage) &&
      !isFetchingNextPage &&
      !isFetchNextPageError;

    if (!shouldLoadMore) {
      return;
    }

    if (lastRequestedPageCountRef.current === pageCount) {
      return;
    }

    lastRequestedPageCountRef.current = pageCount;

    void fetchNextPage({
      cancelRefetch: false,
    });
  }, [
    activeVideoIndex,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
    pageCount,
    videos.length,
  ]);

  const isSharedVideoLoading = Boolean(sharedVideoId) && isSharedVideoPending;

  if (isPending || isSharedVideoLoading) {
    return (
      <ShortsPage>
        <ShortsFeed $appTheme={theme}>
          <ShortVideoSkeleton />
        </ShortsFeed>
      </ShortsPage>
    );
  }

  if (isError && videos.length === 0) {
    return (
      <ShortsStatusPanel $appTheme={theme}>
        <ShortsStatusMessage>
          Failed to load Shorts:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </ShortsStatusMessage>
      </ShortsStatusPanel>
    );
  }

  if (videos.length === 0) {
    return (
      <ShortsStatusPanel $appTheme={theme}>
        <ShortsStatusMessage>
          No Shorts are currently available.
        </ShortsStatusMessage>
      </ShortsStatusPanel>
    );
  }

  return (
    <ShortsPage>
      <ShortsFeed
        ref={feedContainerRef}
        $appTheme={theme}
        aria-label="YouTube Shorts"
      >
        {videos.map((video) => (
          <ShortVideo
            key={video.id}
            video={video}
            isActive={video.id === activeVideoId}
            onOpenWatch={onVideoSelect}
          />
        ))}

        {isFetchingNextPage && <ShortVideoSkeleton />}

        {isFetchNextPageError && (
          <ShortsLoadError>More Shorts could not be loaded.</ShortsLoadError>
        )}
      </ShortsFeed>
    </ShortsPage>
  );
};

export default ShortsView;
