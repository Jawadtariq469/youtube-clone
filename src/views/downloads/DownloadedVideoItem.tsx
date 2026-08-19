import { Button } from '../../components/elements';
import { VideoCard } from '../../components/ui';
import { ButtonHtmlType, ButtonSize, ButtonVariant } from '../../utils/enums';

import {
  DownloadedAt,
  DownloadedVideoContainer,
  DownloadedVideoFooter,
} from './downloadsView.styles';

import type { DownloadedVideoItemProps } from './types';

const formatDownloadedAt = (downloadedAt: string): string => {
  const downloadedDate = new Date(downloadedAt);

  if (Number.isNaN(downloadedDate.getTime())) {
    return 'Downloaded recently';
  }

  return `Downloaded ${new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(downloadedDate)}`;
};

const DownloadedVideoItem = ({
  downloadedVideo,
  onVideoSelect,
  onRemove,
}: DownloadedVideoItemProps) => {
  return (
    <DownloadedVideoContainer>
      <VideoCard video={downloadedVideo} onSelect={onVideoSelect} />

      <DownloadedVideoFooter>
        <DownloadedAt>
          {formatDownloadedAt(downloadedVideo.downloadedAt)}
        </DownloadedAt>

        <Button
          type={ButtonHtmlType.Button}
          variant={ButtonVariant.Secondary}
          size={ButtonSize.Small}
          aria-label={`Remove ${downloadedVideo.title} from downloads`}
          onClick={() => {
            onRemove(downloadedVideo.id);
          }}
        >
          Remove from downloads
        </Button>
      </DownloadedVideoFooter>
    </DownloadedVideoContainer>
  );
};

export default DownloadedVideoItem;
