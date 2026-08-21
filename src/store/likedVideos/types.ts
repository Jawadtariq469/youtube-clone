import type { LikedVideo } from '../../utils/types';

export interface LikedVideosState {
  items: LikedVideo[];

  isLoading: boolean;
  isInitialized: boolean;

  pendingVideoIds: string[];

  error: string | null;
}

export interface LikedVideoMutationPayload {
  video: LikedVideo;
  wasLiked: boolean;
}

export interface LikedVideoMutationFailurePayload extends LikedVideoMutationPayload {
  error: string;
}
