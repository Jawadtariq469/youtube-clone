import { FirebaseError } from 'firebase/app';

import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  removeChannelSubscription,
  saveChannelSubscription,
  subscribeToChannelSubscriptions,
} from '../../services/firebase/subscriptions';

import { selectAuthState, selectAuthUser } from '../auth';

import {
  subscriptionMutationFinished,
  subscriptionMutationStarted,
  subscriptionsErrorCleared,
  subscriptionsLoaded,
  subscriptionsLoadingStarted,
  subscriptionsRequestFailed,
  subscriptionsReset,
} from './action';

import { selectSubscriptionsState } from './selector';

import type { SubscribableChannel } from '../../utils/types';
import type { AppDispatch } from '../store';

const getSubscriptionsErrorMessage = (error: unknown): string => {
  if (!(error instanceof FirebaseError)) {
    return 'Subscriptions could not be updated.';
  }

  switch (error.code) {
    case 'permission-denied':
    case 'firestore/permission-denied':
      return 'You do not have permission to access subscriptions.';

    case 'unavailable':
    case 'firestore/unavailable':
      return 'Subscriptions are temporarily unavailable.';

    default:
      return error.message;
  }
};

export const useSubscriptionsObserver = (): void => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, isInitialized: isAuthInitialized } =
    useSelector(selectAuthState);

  const userId = user?.id;

  useEffect(() => {
    if (!isAuthInitialized) {
      return;
    }

    if (!userId) {
      dispatch(subscriptionsReset());

      return;
    }

    dispatch(subscriptionsLoadingStarted());

    return subscribeToChannelSubscriptions(
      userId,

      (subscriptions) => {
        dispatch(subscriptionsLoaded(subscriptions));
      },

      (error) => {
        dispatch(
          subscriptionsRequestFailed(getSubscriptionsErrorMessage(error)),
        );
      },
    );
  }, [dispatch, isAuthInitialized, userId]);
};

export const useSubscriptions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const subscriptionsState = useSelector(selectSubscriptionsState);

  const user = useSelector(selectAuthUser);

  const isSubscribed = useCallback(
    (channelId: string): boolean => {
      return subscriptionsState.items.some(
        (subscription) => subscription.channelId === channelId,
      );
    },
    [subscriptionsState.items],
  );

  const toggleSubscription = useCallback(
    async (channel: SubscribableChannel): Promise<void> => {
      if (!user || !channel.channelId) {
        return;
      }

      const channelIsSubscribed = subscriptionsState.items.some(
        (subscription) => subscription.channelId === channel.channelId,
      );

      dispatch(subscriptionMutationStarted());

      try {
        if (channelIsSubscribed) {
          await removeChannelSubscription(user.id, channel.channelId);
        } else {
          await saveChannelSubscription(user.id, channel);
        }

        dispatch(subscriptionMutationFinished());
      } catch (error: unknown) {
        dispatch(
          subscriptionsRequestFailed(getSubscriptionsErrorMessage(error)),
        );
      }
    },
    [dispatch, subscriptionsState.items, user],
  );

  const clearError = useCallback((): void => {
    dispatch(subscriptionsErrorCleared());
  }, [dispatch]);

  return {
    ...subscriptionsState,

    isSubscribed,
    toggleSubscription,
    clearError,
  };
};
