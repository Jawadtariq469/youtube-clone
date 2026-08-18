import type { Video } from '../../utils/types';

export interface WatchViewProps {
  autoPlay?: boolean;

  onVideoSelect: (videoId: string) => void;
  onChannelSelect: (channelId: string) => void;
}

export interface ExpandableDescriptionProps {
  description: string;
}

export interface WatchInformationProps {
  video?: Video | null;

  isLoading: boolean;
  isError: boolean;

  error: unknown;

  onChannelSelect: (channelId: string) => void;
}

export interface WatchRecommendationsProps {
  video?: Video | null;

  currentVideoId: string;

  isVideoLoading: boolean;

  onVideoSelect: (videoId: string) => void;
}
export interface RecommendationSelection {
  videoId: string;
  filterId: string;
}
export interface WatchCommentsProps {
  videoId: string;
}
