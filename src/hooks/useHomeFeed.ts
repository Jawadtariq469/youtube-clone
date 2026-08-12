import { useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import {
  getHomeFeedPage,
  INITIAL_HOME_FEED_PAGE_TOKENS,
} from '../services/youtube/getHomeFeed';

import {
  createAdditionalHomeFeedPage,
  createRefreshableHomeFeedPage,
  getUniqueHomeVideos,
  readPreviousHomeFeedIds,
  rememberHomeFeed,
} from '../utils/homeFeed';

// import type { HomeFeedPageTokens } from '../services/youtube/getHomeFeed';

/*
 * A new value is created after a real browser refresh.
 * React StrictMode remounts use the same module value,
 * preventing the feed from being rotated twice.
 */
const HOME_FEED_REFRESH_SEED = `${Date.now()}-${Math.random()
  .toString(36)
  .slice(2)}`;

const HOME_FEED_QUERY_KEY = ['youtube', 'home-feed', 'infinite'] as const;

export const useHomeFeed = (isEnabled = true) => {
  const [previousVideoIds] = useState<string[]>(readPreviousHomeFeedIds);

  const query = useInfiniteQuery({
    queryKey: HOME_FEED_QUERY_KEY,

    queryFn: ({ pageParam }) => getHomeFeedPage(pageParam),

    initialPageParam: INITIAL_HOME_FEED_PAGE_TOKENS,

    getNextPageParam: (lastPage) => {
      const nextPageTokens = lastPage.nextPageTokens;

      return Object.keys(nextPageTokens).length > 0
        ? nextPageTokens
        : undefined;
    },

    enabled: isEnabled,
  });

  const videos = useMemo(() => {
    const pages = query.data?.pages ?? [];

    const feedPages = pages.map((page, pageIndex) => {
      if (pageIndex === 0) {
        return createRefreshableHomeFeedPage(
          page.videos,
          previousVideoIds,
          HOME_FEED_REFRESH_SEED,
        );
      }

      return createAdditionalHomeFeedPage(
        page.videos,
        `${HOME_FEED_REFRESH_SEED}-${pageIndex}`,
      );
    });

    return getUniqueHomeVideos(feedPages.flat());
  }, [previousVideoIds, query.data]);

  useEffect(() => {
    if (videos.length === 0) {
      return;
    }

    rememberHomeFeed(videos);
  }, [videos]);

  return {
    ...query,
    videos,
  };
};
