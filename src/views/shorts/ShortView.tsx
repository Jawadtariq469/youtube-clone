import { useEffect, useMemo, useRef, useState } from 'react';

import { ShortVideo, ShortVideoSkeleton } from '../../components/ui';

import { useInfiniteShortVideos } from '../../hooks/useInfiniteShortVideos';

import { useTheme } from '../../store/global';

import {
  ShortsFeed,
  ShortsLoadError,
  ShortsPage,
  ShortsStatusMessage,
  ShortsStatusPanel,
} from './../shorts/shortView.styles';

import type { Video } from '../../utils/types';

import type { ShortsViewProps } from './../shorts/types';

const ACTIVE_VIDEO_THRESHOLD = 0.65;

const LOAD_AHEAD_VIDEO_COUNT = 4;

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
  const feedContainerRef = useRef<HTMLDivElement | null>(null);

  const lastRequestedPageCountRef = useRef(0);

  const [observedActiveVideoId, setObservedActiveVideoId] = useState<
    string | null
  >(null);

  const { theme } = useTheme();

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

    return getUniqueVideos(fetchedVideos);
  }, [data]);

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

  if (isPending) {
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
