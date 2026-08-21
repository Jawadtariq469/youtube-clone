import { FirebaseError } from 'firebase/app';

import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  removeWatchLaterVideo as removeWatchLaterVideoDocument,
  saveWatchLaterVideo,
  subscribeToWatchLaterVideos,
} from '../../services/firebase/watchLater';

import { selectAuthState, selectAuthUser } from '../auth';

import {
  watchLaterErrorCleared,
  watchLaterLoaded,
  watchLaterLoadingStarted,
  watchLaterMutationFailed,
  watchLaterMutationFinished,
  watchLaterMutationStarted,
  watchLaterRequestFailed,
  watchLaterReset,
} from './action';

import { selectWatchLaterState } from './selector';

import type { Video, WatchLaterVideo } from '../../utils/types';
import type { AppDispatch } from '../store';

const getWatchLaterErrorMessage = (error: unknown): string => {
  if (!(error instanceof FirebaseError)) {
    return 'Watch Later could not be updated.';
  }

  switch (error.code) {
    case 'permission-denied':
    case 'firestore/permission-denied':
      return 'You do not have permission to access Watch Later.';

    case 'unavailable':
    case 'firestore/unavailable':
      return 'Watch Later is temporarily unavailable.';

    default:
      return error.message;
  }
};

export const useWatchLaterObserver = (): void => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, isInitialized: isAuthInitialized } =
    useSelector(selectAuthState);

  const userId = user?.id;

  useEffect(() => {
    if (!isAuthInitialized) {
      return;
    }

    if (!userId) {
      dispatch(watchLaterReset());

      return;
    }

    dispatch(watchLaterLoadingStarted());

    return subscribeToWatchLaterVideos(
      userId,

      (videos) => {
        dispatch(watchLaterLoaded(videos));
      },

      (error) => {
        dispatch(watchLaterRequestFailed(getWatchLaterErrorMessage(error)));
      },
    );
  }, [dispatch, isAuthInitialized, userId]);
};

export const useWatchLater = () => {
  const dispatch = useDispatch<AppDispatch>();

  const watchLaterState = useSelector(selectWatchLaterState);

  const user = useSelector(selectAuthUser);

  const isInWatchLater = useCallback(
    (videoId: string): boolean => {
      return watchLaterState.items.some(
        (watchLaterVideo) => watchLaterVideo.id === videoId,
      );
    },
    [watchLaterState.items],
  );

  const isWatchLaterMutating = useCallback(
    (videoId: string): boolean => {
      return watchLaterState.pendingVideoIds.includes(videoId);
    },
    [watchLaterState.pendingVideoIds],
  );

  const toggleWatchLater = useCallback(
    async (video: Video): Promise<void> => {
      if (!user || watchLaterState.pendingVideoIds.includes(video.id)) {
        return;
      }

      const existingWatchLaterVideo = watchLaterState.items.find(
        (watchLaterVideo) => watchLaterVideo.id === video.id,
      );

      const wasSaved = Boolean(existingWatchLaterVideo);

      const mutationVideo: WatchLaterVideo = existingWatchLaterVideo ?? {
        ...video,
        savedAt: new Date().toISOString(),
      };

      dispatch(
        watchLaterMutationStarted({
          video: mutationVideo,
          wasSaved,
        }),
      );

      try {
        if (wasSaved) {
          await removeWatchLaterVideoDocument(user.id, video.id);
        } else {
          await saveWatchLaterVideo(user.id, video);
        }

        dispatch(watchLaterMutationFinished(video.id));
      } catch (error: unknown) {
        dispatch(
          watchLaterMutationFailed({
            video: mutationVideo,
            wasSaved,
            error: getWatchLaterErrorMessage(error),
          }),
        );
      }
    },
    [dispatch, user, watchLaterState.items, watchLaterState.pendingVideoIds],
  );

  const removeWatchLaterVideo = useCallback(
    async (videoId: string): Promise<void> => {
      if (!user || watchLaterState.pendingVideoIds.includes(videoId)) {
        return;
      }

      const watchLaterVideo = watchLaterState.items.find(
        (video) => video.id === videoId,
      );

      if (!watchLaterVideo) {
        return;
      }

      dispatch(
        watchLaterMutationStarted({
          video: watchLaterVideo,
          wasSaved: true,
        }),
      );

      try {
        await removeWatchLaterVideoDocument(user.id, videoId);

        dispatch(watchLaterMutationFinished(videoId));
      } catch (error: unknown) {
        dispatch(
          watchLaterMutationFailed({
            video: watchLaterVideo,
            wasSaved: true,
            error: getWatchLaterErrorMessage(error),
          }),
        );
      }
    },
    [dispatch, user, watchLaterState.items, watchLaterState.pendingVideoIds],
  );

  const clearError = useCallback((): void => {
    dispatch(watchLaterErrorCleared());
  }, [dispatch]);

  return {
    ...watchLaterState,

    isInWatchLater,
    isWatchLaterMutating,
    toggleWatchLater,
    removeWatchLaterVideo,
    clearError,
  };
};
