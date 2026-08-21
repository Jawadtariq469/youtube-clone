import { FirebaseError } from 'firebase/app';

import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  removeLikedVideo as removeLikedVideoDocument,
  saveLikedVideo,
  subscribeToLikedVideos,
} from '../../services/firebase/likedVideos';

import { selectAuthState, selectAuthUser } from '../auth';

import {
  likedVideoMutationFailed,
  likedVideoMutationFinished,
  likedVideoMutationStarted,
  likedVideosErrorCleared,
  likedVideosLoaded,
  likedVideosLoadingStarted,
  likedVideosRequestFailed,
  likedVideosReset,
} from './action';

import { selectLikedVideosState } from './selector';

import type { LikedVideo, Video } from '../../utils/types';

import type { AppDispatch } from '../store';

const getLikedVideosErrorMessage = (error: unknown): string => {
  if (!(error instanceof FirebaseError)) {
    return 'Liked videos could not be updated.';
  }

  switch (error.code) {
    case 'permission-denied':
    case 'firestore/permission-denied':
      return 'You do not have permission to access liked videos.';

    case 'unavailable':
    case 'firestore/unavailable':
      return 'Liked videos are temporarily unavailable.';

    default:
      return error.message;
  }
};

export const useLikedVideosObserver = (): void => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, isInitialized: isAuthInitialized } =
    useSelector(selectAuthState);

  const userId = user?.id;

  useEffect(() => {
    if (!isAuthInitialized) {
      return;
    }

    if (!userId) {
      dispatch(likedVideosReset());

      return;
    }

    dispatch(likedVideosLoadingStarted());

    return subscribeToLikedVideos(
      userId,

      (likedVideos) => {
        dispatch(likedVideosLoaded(likedVideos));
      },

      (error) => {
        dispatch(likedVideosRequestFailed(getLikedVideosErrorMessage(error)));
      },
    );
  }, [dispatch, isAuthInitialized, userId]);
};

export const useLikedVideos = () => {
  const dispatch = useDispatch<AppDispatch>();

  const likedVideosState = useSelector(selectLikedVideosState);

  const user = useSelector(selectAuthUser);

  const isLiked = useCallback(
    (videoId: string): boolean => {
      return likedVideosState.items.some(
        (likedVideo) => likedVideo.id === videoId,
      );
    },
    [likedVideosState.items],
  );

  const isLikeMutating = useCallback(
    (videoId: string): boolean => {
      return likedVideosState.pendingVideoIds.includes(videoId);
    },
    [likedVideosState.pendingVideoIds],
  );

  const toggleLike = useCallback(
    async (video: Video): Promise<void> => {
      if (!user || likedVideosState.pendingVideoIds.includes(video.id)) {
        return;
      }

      const existingLikedVideo = likedVideosState.items.find(
        (likedVideo) => likedVideo.id === video.id,
      );

      const wasLiked = Boolean(existingLikedVideo);

      const mutationVideo: LikedVideo = existingLikedVideo ?? {
        ...video,

        likedAt: new Date().toISOString(),
      };

      dispatch(
        likedVideoMutationStarted({
          video: mutationVideo,
          wasLiked,
        }),
      );

      try {
        if (wasLiked) {
          await removeLikedVideoDocument(user.id, video.id);
        } else {
          await saveLikedVideo(user.id, video);
        }

        dispatch(likedVideoMutationFinished(video.id));
      } catch (error: unknown) {
        dispatch(
          likedVideoMutationFailed({
            video: mutationVideo,
            wasLiked,

            error: getLikedVideosErrorMessage(error),
          }),
        );
      }
    },
    [dispatch, likedVideosState.items, likedVideosState.pendingVideoIds, user],
  );

  const removeLikedVideo = useCallback(
    async (videoId: string): Promise<void> => {
      if (!user || likedVideosState.pendingVideoIds.includes(videoId)) {
        return;
      }

      const likedVideo = likedVideosState.items.find(
        (item) => item.id === videoId,
      );

      if (!likedVideo) {
        return;
      }

      dispatch(
        likedVideoMutationStarted({
          video: likedVideo,
          wasLiked: true,
        }),
      );

      try {
        await removeLikedVideoDocument(user.id, videoId);

        dispatch(likedVideoMutationFinished(videoId));
      } catch (error: unknown) {
        dispatch(
          likedVideoMutationFailed({
            video: likedVideo,
            wasLiked: true,

            error: getLikedVideosErrorMessage(error),
          }),
        );
      }
    },
    [dispatch, likedVideosState.items, likedVideosState.pendingVideoIds, user],
  );

  const clearError = useCallback((): void => {
    dispatch(likedVideosErrorCleared());
  }, [dispatch]);

  return {
    ...likedVideosState,

    isLiked,
    isLikeMutating,
    toggleLike,
    removeLikedVideo,
    clearError,
  };
};
