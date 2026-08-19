import type { DownloadedVideo } from '../../utils/types';

export interface DownloadsViewProps {
  onVideoSelect: (videoId: string) => void;
}

export interface DownloadedVideoItemProps {
  downloadedVideo: DownloadedVideo;

  onVideoSelect: (videoId: string) => void;
  onRemove: (videoId: string) => void;
}
