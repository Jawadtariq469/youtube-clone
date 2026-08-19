import { Button } from '../../components/elements';
import { useDownloads } from '../../store/downloads';
import { ButtonHtmlType, ButtonSize, ButtonVariant } from '../../utils/enums';

import DownloadedVideoItem from './DownloadedVideoItem';

import {
  DownloadsGrid,
  DownloadsHeader,
  DownloadsHeaderAction,
  DownloadsPage,
  DownloadsStatusMessage,
  DownloadsStatusPanel,
  DownloadsSubtitle,
  DownloadsTitle,
  DownloadsTitleGroup,
} from './downloadsView.styles';

import type { DownloadsViewProps } from './types';

const DownloadsView = ({ onVideoSelect }: DownloadsViewProps) => {
  const { items, removeDownload, clearDownloads } = useDownloads();

  const handleClearDownloads = (): void => {
    const shouldClearDownloads = window.confirm(
      'Remove every video from downloads?',
    );

    if (!shouldClearDownloads) {
      return;
    }

    clearDownloads();
  };

  return (
    <DownloadsPage>
      <DownloadsHeader>
        <DownloadsTitleGroup>
          <DownloadsTitle>Downloads</DownloadsTitle>

          <DownloadsSubtitle>
            {items.length} {items.length === 1 ? 'video' : 'videos'}
          </DownloadsSubtitle>
        </DownloadsTitleGroup>

        {items.length > 0 && (
          <DownloadsHeaderAction>
            <Button
              type={ButtonHtmlType.Button}
              variant={ButtonVariant.Secondary}
              size={ButtonSize.Medium}
              onClick={handleClearDownloads}
            >
              Remove all downloads
            </Button>
          </DownloadsHeaderAction>
        )}
      </DownloadsHeader>

      {items.length === 0 ? (
        <DownloadsStatusPanel>
          <DownloadsStatusMessage>
            Videos you download from their watch page will appear here.
          </DownloadsStatusMessage>
        </DownloadsStatusPanel>
      ) : (
        <DownloadsGrid>
          {items.map((downloadedVideo) => (
            <DownloadedVideoItem
              key={downloadedVideo.id}
              downloadedVideo={downloadedVideo}
              onVideoSelect={onVideoSelect}
              onRemove={removeDownload}
            />
          ))}
        </DownloadsGrid>
      )}
    </DownloadsPage>
  );
};

export default DownloadsView;
