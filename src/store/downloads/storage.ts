import type { DownloadedVideo } from '../../utils/types';

const DOWNLOADS_STORAGE_KEY = 'youtube-clone-downloads';

const isDownloadedVideo = (value: unknown): value is DownloadedVideo => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const video = value as Partial<DownloadedVideo>;

  return (
    typeof video.id === 'string' &&
    typeof video.title === 'string' &&
    typeof video.thumbnailUrl === 'string' &&
    typeof video.channelId === 'string' &&
    typeof video.channelTitle === 'string' &&
    typeof video.viewCount === 'number' &&
    typeof video.publishedAt === 'string' &&
    typeof video.category === 'string' &&
    typeof video.downloadedAt === 'string'
  );
};

export const readDownloadedVideos = (): DownloadedVideo[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedDownloads = window.localStorage.getItem(DOWNLOADS_STORAGE_KEY);

    if (!storedDownloads) {
      return [];
    }

    const parsedDownloads: unknown = JSON.parse(storedDownloads);

    if (!Array.isArray(parsedDownloads)) {
      return [];
    }

    return parsedDownloads.filter(isDownloadedVideo);
  } catch {
    return [];
  }
};

export const persistDownloadedVideos = (
  downloadedVideos: DownloadedVideo[],
): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      DOWNLOADS_STORAGE_KEY,
      JSON.stringify(downloadedVideos),
    );
  } catch {
    /*
     * The current Redux state can still be used when browser storage
     * is unavailable, even though it will not survive a refresh.
     */
  }
};
