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

import type { LikedVideo, Video } from '../../utils/types';

interface FirestoreLikedVideoDocument {
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

  likedAt?: Timestamp;
}

const getLikedVideosCollection = (userId: string) => {
  return collection(firestoreDatabase, 'users', userId, 'likedVideos');
};

const mapLikedVideoDocument = (
  documentSnapshot: QueryDocumentSnapshot,
): LikedVideo => {
  const data = documentSnapshot.data({
    serverTimestamps: 'estimate',
  }) as FirestoreLikedVideoDocument;

  return {
    id: documentSnapshot.id,

    title: data.title,
    thumbnailUrl: data.thumbnailUrl,

    channelId: data.channelId ?? '',
    channelTitle: data.channelTitle,

    viewCount: data.viewCount,
    publishedAt: data.publishedAt,

    category: data.category,

    likedAt: data.likedAt?.toDate().toISOString() ?? new Date().toISOString(),

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

export const subscribeToLikedVideos = (
  userId: string,
  onLikedVideosChange: (likedVideos: LikedVideo[]) => void,
  onError: (error: Error) => void,
): Unsubscribe => {
  const likedVideosQuery = query(
    getLikedVideosCollection(userId),
    orderBy('likedAt', 'desc'),
  );

  return onSnapshot(
    likedVideosQuery,

    (likedVideosSnapshot) => {
      const likedVideos = likedVideosSnapshot.docs.map(mapLikedVideoDocument);

      onLikedVideosChange(likedVideos);
    },

    onError,
  );
};

export const saveLikedVideo = async (
  userId: string,
  video: Video,
): Promise<void> => {
  const likedVideoDocument = doc(getLikedVideosCollection(userId), video.id);

  await setDoc(likedVideoDocument, {
    title: video.title,
    thumbnailUrl: video.thumbnailUrl,

    channelId: video.channelId,
    channelTitle: video.channelTitle,

    viewCount: video.viewCount,
    publishedAt: video.publishedAt,

    category: video.category,

    likedAt: serverTimestamp(),

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

export const removeLikedVideo = async (
  userId: string,
  videoId: string,
): Promise<void> => {
  const likedVideoDocument = doc(getLikedVideosCollection(userId), videoId);

  await deleteDoc(likedVideoDocument);
};
