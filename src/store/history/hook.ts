import { FirebaseError } from 'firebase/app';

import { useCallback, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  clearUserWatchHistory,
  removeVideoFromWatchHistory,
  saveVideoToWatchHistory,
  subscribeToWatchHistory,
} from '../../services/firebase/watchHistory';

import { selectAuthState, selectAuthUser } from '../auth';

import type { Video } from '../../utils/types';

import type { AppDispatch } from '../store';

import {
  historyErrorCleared,
  historyLoaded,
  historyLoadingStarted,
  historyMutationFinished,
  historyMutationStarted,
  historyRequestFailed,
  historyReset,
} from './action';

import { selectHistoryState } from './selector';

const getHistoryErrorMessage = (error: unknown): string => {
  if (!(error instanceof FirebaseError)) {
    return 'Watch history could not be updated.';
  }

  switch (error.code) {
    case 'permission-denied':
    case 'firestore/permission-denied':
      return 'You do not have permission to access this history.';

    case 'unavailable':
    case 'firestore/unavailable':
      return 'Watch history is temporarily unavailable.';

    default:
      return error.message;
  }
};

export const useHistoryObserver = (): void => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, isInitialized: isAuthInitialized } =
    useSelector(selectAuthState);

  const userId = user?.id;

  useEffect(() => {
    if (!isAuthInitialized) {
      return;
    }

    if (!userId) {
      dispatch(historyReset());

      return;
    }

    dispatch(historyLoadingStarted());

    return subscribeToWatchHistory(
      userId,

      (historyItems) => {
        dispatch(historyLoaded(historyItems));
      },

      (error) => {
        dispatch(historyRequestFailed(getHistoryErrorMessage(error)));
      },
    );
  }, [dispatch, isAuthInitialized, userId]);
};

export const useRecordWatchHistory = (
  video: Video | null | undefined,
): void => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectAuthUser);

  const recordedHistoryKeyRef = useRef<string | null>(null);

  const userId = user?.id;

  useEffect(() => {
    if (!userId || !video) {
      return;
    }

    const historyKey = `${userId}-${video.id}`;

    if (recordedHistoryKeyRef.current === historyKey) {
      return;
    }

    recordedHistoryKeyRef.current = historyKey;

    void saveVideoToWatchHistory(userId, video).catch((error: unknown) => {
      recordedHistoryKeyRef.current = null;

      dispatch(historyRequestFailed(getHistoryErrorMessage(error)));
    });
  }, [dispatch, userId, video]);
};

export const useWatchHistory = () => {
  const dispatch = useDispatch<AppDispatch>();

  const historyState = useSelector(selectHistoryState);

  const user = useSelector(selectAuthUser);

  const removeVideo = useCallback(
    async (videoId: string): Promise<void> => {
      if (!user) {
        return;
      }

      dispatch(historyMutationStarted());

      try {
        await removeVideoFromWatchHistory(user.id, videoId);

        dispatch(historyMutationFinished());
      } catch (error: unknown) {
        dispatch(historyRequestFailed(getHistoryErrorMessage(error)));
      }
    },
    [dispatch, user],
  );

  const clearHistory = useCallback(async (): Promise<void> => {
    if (!user) {
      return;
    }

    dispatch(historyMutationStarted());

    try {
      await clearUserWatchHistory(user.id);

      dispatch(historyMutationFinished());
    } catch (error: unknown) {
      dispatch(historyRequestFailed(getHistoryErrorMessage(error)));
    }
  }, [dispatch, user]);

  const clearError = useCallback((): void => {
    dispatch(historyErrorCleared());
  }, [dispatch]);

  return {
    ...historyState,

    removeVideo,
    clearHistory,
    clearError,
  };
};
