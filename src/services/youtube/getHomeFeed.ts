import {
  getUniqueHomeVideos,
  interleaveVideoGroups,
} from '../../utils/homeFeed';

import { getPopularVideosPage } from './getPopularVideos';

import type { Video } from '../../utils/types';

export type HomeFeedPageTokens = Record<string, string>;

export interface HomeFeedPage {
  videos: Video[];
  nextPageTokens: HomeFeedPageTokens;
}

/*
 * Education is not included here because its popular
 * chart returned 404 for the selected region and its
 * search fallback costs considerably more API quota.
 */
const HOME_FEED_CATEGORY_IDS = ['0', '10', '20', '17', '24', '25'] as const;

export const INITIAL_HOME_FEED_PAGE_TOKENS: HomeFeedPageTokens =
  Object.fromEntries(
    HOME_FEED_CATEGORY_IDS.map((categoryId) => [categoryId, '']),
  );

export const getHomeFeedPage = async (
  pageTokens: HomeFeedPageTokens,
): Promise<HomeFeedPage> => {
  const activeSources = Object.entries(pageTokens);

  const sourceRequests = activeSources.map(async ([categoryId, pageToken]) => {
    const page = await getPopularVideosPage(categoryId, pageToken);

    return {
      categoryId,
      page,
    };
  });

  const sourceResults = await Promise.allSettled(sourceRequests);

  const videoGroups: Video[][] = [];

  const nextPageTokens: HomeFeedPageTokens = {};

  let firstSourceError: unknown;

  for (const sourceResult of sourceResults) {
    if (sourceResult.status === 'rejected') {
      firstSourceError ??= sourceResult.reason;

      continue;
    }

    const { categoryId, page } = sourceResult.value;

    videoGroups.push(page.videos);

    if (page.nextPageToken) {
      nextPageTokens[categoryId] = page.nextPageToken;
    }
  }

  if (videoGroups.length === 0 && firstSourceError) {
    throw firstSourceError;
  }

  return {
    videos: getUniqueHomeVideos(interleaveVideoGroups(videoGroups)),

    nextPageTokens,
  };
};
