const HISTORY_PAUSED_STORAGE_KEY = 'youtube-clone-history-paused';

export const readIsHistoryPaused = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.localStorage.getItem(HISTORY_PAUSED_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const persistIsHistoryPaused = (isPaused: boolean): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(HISTORY_PAUSED_STORAGE_KEY, String(isPaused));
  } catch {
    // Redux still keeps the setting for the current browser session.
  }
};
