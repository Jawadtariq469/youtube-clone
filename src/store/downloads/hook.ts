import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../global';

import {
  downloadedVideoRemoved,
  downloadsCleared,
  videoDownloaded,
} from './action';
import { selectDownloadedVideos } from './selector';

import type { Video } from '../../utils/types';

export const useDownloads = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectDownloadedVideos);

  const isDownloaded = useCallback(
    (videoId: string): boolean => {
      return items.some((downloadedVideo) => downloadedVideo.id === videoId);
    },
    [items],
  );

  const downloadVideo = useCallback(
    (video: Video): void => {
      dispatch(
        videoDownloaded({
          ...video,
          downloadedAt: new Date().toISOString(),
        }),
      );
    },
    [dispatch],
  );

  const removeDownload = useCallback(
    (videoId: string): void => {
      dispatch(downloadedVideoRemoved(videoId));
    },
    [dispatch],
  );

  const clearDownloads = useCallback((): void => {
    dispatch(downloadsCleared());
  }, [dispatch]);

  return {
    items,
    isDownloaded,
    downloadVideo,
    removeDownload,
    clearDownloads,
  };
};
