import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';

import { firestoreDatabase } from '../../config';

import type { QueryDocumentSnapshot, Unsubscribe } from 'firebase/firestore';

import type { Video, WatchHistoryItem } from '../../utils/types';

interface FirestoreHistoryDocument {
  title: string;
  thumbnailUrl: string;
  channelTitle: string;

  channelAvatarUrl?: string;

  viewCount: number;
  publishedAt: string;

  duration?: string;

  category: string;
  description?: string;

  watchedAt?: Timestamp;
}

const HISTORY_BATCH_SIZE = 450;

const getHistoryCollection = (userId: string) => {
  return collection(firestoreDatabase, 'users', userId, 'watchHistory');
};

const mapHistoryDocument = (
  documentSnapshot: QueryDocumentSnapshot,
): WatchHistoryItem => {
  const data = documentSnapshot.data({
    serverTimestamps: 'estimate',
  }) as FirestoreHistoryDocument;

  return {
    id: documentSnapshot.id,

    title: data.title,
    thumbnailUrl: data.thumbnailUrl,
    channelTitle: data.channelTitle,

    viewCount: data.viewCount,
    publishedAt: data.publishedAt,

    category: data.category,

    watchedAt:
      data.watchedAt?.toDate().toISOString() ?? new Date().toISOString(),

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

export const subscribeToWatchHistory = (
  userId: string,
  onHistoryChange: (historyItems: WatchHistoryItem[]) => void,
  onError: (error: Error) => void,
): Unsubscribe => {
  const historyQuery = query(
    getHistoryCollection(userId),
    orderBy('watchedAt', 'desc'),
  );

  return onSnapshot(
    historyQuery,

    (historySnapshot) => {
      const historyItems = historySnapshot.docs.map(mapHistoryDocument);

      onHistoryChange(historyItems);
    },

    onError,
  );
};

export const saveVideoToWatchHistory = async (
  userId: string,
  video: Video,
): Promise<void> => {
  const historyDocument = doc(getHistoryCollection(userId), video.id);

  await setDoc(historyDocument, {
    title: video.title,

    thumbnailUrl: video.thumbnailUrl,

    channelTitle: video.channelTitle,

    viewCount: video.viewCount,
    publishedAt: video.publishedAt,

    category: video.category,

    watchedAt: serverTimestamp(),

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

export const removeVideoFromWatchHistory = async (
  userId: string,
  videoId: string,
): Promise<void> => {
  const historyDocument = doc(getHistoryCollection(userId), videoId);

  await deleteDoc(historyDocument);
};

export const clearUserWatchHistory = async (userId: string): Promise<void> => {
  const historySnapshot = await getDocs(getHistoryCollection(userId));

  for (
    let startIndex = 0;
    startIndex < historySnapshot.docs.length;
    startIndex += HISTORY_BATCH_SIZE
  ) {
    const batch = writeBatch(firestoreDatabase);

    const documentGroup = historySnapshot.docs.slice(
      startIndex,
      startIndex + HISTORY_BATCH_SIZE,
    );

    documentGroup.forEach((historyDocument) => {
      batch.delete(historyDocument.ref);
    });

    await batch.commit();
  }
};
