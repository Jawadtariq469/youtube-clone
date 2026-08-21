import type { WatchLaterVideo } from '../../utils/types';

export interface WatchLaterState {
  items: WatchLaterVideo[];

  isLoading: boolean;
  isInitialized: boolean;

  pendingVideoIds: string[];

  error: string | null;
}

export interface WatchLaterMutationPayload {
  video: WatchLaterVideo;
  wasSaved: boolean;
}

export interface WatchLaterMutationFailurePayload extends WatchLaterMutationPayload {
  error: string;
}
