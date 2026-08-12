import { FirebaseError } from 'firebase/app';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { firebaseAuth, googleAuthProvider } from '../../config';

import type { User as FirebaseUser } from 'firebase/auth';
import type { AppDispatch } from '../store';

import {
  authErrorCleared,
  authRequestFailed,
  authRequestStarted,
  authStateChanged,
} from './action';
import { selectAuthState } from './selector';

import type { AuthUser } from './types';

const mapFirebaseUser = (firebaseUser: FirebaseUser): AuthUser => {
  const fallbackName = firebaseUser.email?.split('@')[0] ?? 'User';

  return {
    id: firebaseUser.uid,

    name: firebaseUser.displayName?.trim() || fallbackName,

    email: firebaseUser.email,

    avatarUrl: firebaseUser.photoURL,
  };
};

const getAuthenticationErrorMessage = (error: unknown): string => {
  if (!(error instanceof FirebaseError)) {
    return 'Authentication failed. Please try again.';
  }

  switch (error.code) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled.';

    case 'auth/popup-blocked':
      return 'The browser blocked the sign-in popup.';

    case 'auth/network-request-failed':
      return 'Please check your internet connection.';

    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in Firebase.';

    default:
      return error.message;
  }
};

export const useAuthObserver = (): void => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,

      (firebaseUser) => {
        dispatch(
          authStateChanged(firebaseUser ? mapFirebaseUser(firebaseUser) : null),
        );
      },

      (error) => {
        dispatch(authRequestFailed(getAuthenticationErrorMessage(error)));
      },
    );

    return unsubscribe;
  }, [dispatch]);
};

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authState = useSelector(selectAuthState);

  const signInWithGoogle = useCallback(async (): Promise<void> => {
    dispatch(authRequestStarted());

    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider);
    } catch (error: unknown) {
      dispatch(authRequestFailed(getAuthenticationErrorMessage(error)));
    }
  }, [dispatch]);

  const signOut = useCallback(async (): Promise<void> => {
    dispatch(authRequestStarted());

    try {
      await firebaseSignOut(firebaseAuth);
    } catch (error: unknown) {
      dispatch(authRequestFailed(getAuthenticationErrorMessage(error)));
    }
  }, [dispatch]);

  const clearAuthError = useCallback((): void => {
    dispatch(authErrorCleared());
  }, [dispatch]);

  return {
    ...authState,

    isAuthenticated: authState.user !== null,

    signInWithGoogle,
    signOut,
    clearAuthError,
  };
};
