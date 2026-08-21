const ACTIVE_SHORT_VIDEO_ID_STORAGE_KEY = 'youtube-clone-active-short-video-id';

export const readActiveShortVideoId = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedVideoId = window.sessionStorage.getItem(
      ACTIVE_SHORT_VIDEO_ID_STORAGE_KEY,
    );

    const normalizedVideoId = storedVideoId?.trim() ?? '';

    return normalizedVideoId || null;
  } catch {
    return null;
  }
};

export const persistActiveShortVideoId = (videoId: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedVideoId = videoId.trim();

  if (!normalizedVideoId) {
    return;
  }

  try {
    window.sessionStorage.setItem(
      ACTIVE_SHORT_VIDEO_ID_STORAGE_KEY,
      normalizedVideoId,
    );
  } catch {
    /*
     * The current Shorts visit still works when
     * browser storage is unavailable.
     */
  }
};
