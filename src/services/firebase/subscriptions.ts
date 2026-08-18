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

import type {
  ChannelSubscription,
  SubscribableChannel,
} from '../../utils/types';

interface FirestoreSubscriptionDocument {
  channelTitle: string;
  channelAvatarUrl?: string;

  subscribedAt?: Timestamp;
}

const getSubscriptionsCollection = (userId: string) => {
  return collection(firestoreDatabase, 'users', userId, 'subscriptions');
};

const mapSubscriptionDocument = (
  documentSnapshot: QueryDocumentSnapshot,
): ChannelSubscription => {
  const data = documentSnapshot.data({
    serverTimestamps: 'estimate',
  }) as FirestoreSubscriptionDocument;

  return {
    channelId: documentSnapshot.id,
    channelTitle: data.channelTitle,

    subscribedAt:
      data.subscribedAt?.toDate().toISOString() ?? new Date().toISOString(),

    ...(data.channelAvatarUrl
      ? {
          channelAvatarUrl: data.channelAvatarUrl,
        }
      : {}),
  };
};

export const subscribeToChannelSubscriptions = (
  userId: string,
  onSubscriptionsChange: (subscriptions: ChannelSubscription[]) => void,
  onError: (error: Error) => void,
): Unsubscribe => {
  const subscriptionsQuery = query(
    getSubscriptionsCollection(userId),
    orderBy('subscribedAt', 'desc'),
  );

  return onSnapshot(
    subscriptionsQuery,

    (subscriptionsSnapshot) => {
      const subscriptions = subscriptionsSnapshot.docs.map(
        mapSubscriptionDocument,
      );

      onSubscriptionsChange(subscriptions);
    },

    onError,
  );
};

export const saveChannelSubscription = async (
  userId: string,
  channel: SubscribableChannel,
): Promise<void> => {
  const subscriptionDocument = doc(
    getSubscriptionsCollection(userId),
    channel.channelId,
  );

  await setDoc(subscriptionDocument, {
    channelTitle: channel.channelTitle,
    subscribedAt: serverTimestamp(),

    ...(channel.channelAvatarUrl
      ? {
          channelAvatarUrl: channel.channelAvatarUrl,
        }
      : {}),
  });
};

export const removeChannelSubscription = async (
  userId: string,
  channelId: string,
): Promise<void> => {
  const subscriptionDocument = doc(
    getSubscriptionsCollection(userId),
    channelId,
  );

  await deleteDoc(subscriptionDocument);
};
