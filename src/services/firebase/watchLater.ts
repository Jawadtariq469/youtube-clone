import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';

import { firestoreDatabase } from '../../config';

import type { QueryDocumentSnapshot, Unsubscribe } from 'firebase/firestore';
import type { Video, WatchLaterVideo } from '../../utils/types';

interface FirestoreWatchLaterVideoDocument {
  title: string;
  thumbnailUrl: string;

  channelId: string;
  channelTitle: string;
  channelAvatarUrl?: string;

  viewCount: number;
  publishedAt: string;

  duration?: string;
  category: string;
  description?: string;

  savedAt?: Timestamp;
}

const getWatchLaterCollection = (userId: string) => {
  return collection(firestoreDatabase, 'users', userId, 'watchLater');
};

const mapWatchLaterVideoDocument = (
  documentSnapshot: QueryDocumentSnapshot,
): WatchLaterVideo => {
  const data = documentSnapshot.data({
    serverTimestamps: 'estimate',
  }) as FirestoreWatchLaterVideoDocument;

  return {
    id: documentSnapshot.id,

    title: data.title,
    thumbnailUrl: data.thumbnailUrl,

    channelId: data.channelId ?? '',
    channelTitle: data.channelTitle,

    viewCount: data.viewCount,
    publishedAt: data.publishedAt,

    category: data.category,

    savedAt: data.savedAt?.toDate().toISOString() ?? new Date().toISOString(),

    ...(data.channelAvatarUrl
      ? {
          channelAvatarUrl: data.channelAvatarUrl,
        }
      : {}),

    ...(data.duration
      ? {
          duration: data.duration,
        }
      : {}),

    ...(data.description
      ? {
          description: data.description,
        }
      : {}),
  };
};

export const subscribeToWatchLaterVideos = (
  userId: string,
  onWatchLaterVideosChange: (videos: WatchLaterVideo[]) => void,
  onError: (error: Error) => void,
): Unsubscribe => {
  const watchLaterQuery = query(
    getWatchLaterCollection(userId),
    orderBy('savedAt', 'desc'),
  );

  return onSnapshot(
    watchLaterQuery,

    (watchLaterSnapshot) => {
      const videos = watchLaterSnapshot.docs.map(mapWatchLaterVideoDocument);

      onWatchLaterVideosChange(videos);
    },

    onError,
  );
};

export const saveWatchLaterVideo = async (
  userId: string,
  video: Video,
): Promise<void> => {
  const watchLaterDocument = doc(getWatchLaterCollection(userId), video.id);

  await setDoc(watchLaterDocument, {
    title: video.title,
    thumbnailUrl: video.thumbnailUrl,

    channelId: video.channelId,
    channelTitle: video.channelTitle,

    viewCount: video.viewCount,
    publishedAt: video.publishedAt,

    category: video.category,

    savedAt: serverTimestamp(),

    ...(video.channelAvatarUrl
      ? {
          channelAvatarUrl: video.channelAvatarUrl,
        }
      : {}),

    ...(video.duration
      ? {
          duration: video.duration,
        }
      : {}),

    ...(video.description
      ? {
          description: video.description,
        }
      : {}),
  });
};

export const removeWatchLaterVideo = async (
  userId: string,
  videoId: string,
): Promise<void> => {
  const watchLaterDocument = doc(getWatchLaterCollection(userId), videoId);

  await deleteDoc(watchLaterDocument);
};
