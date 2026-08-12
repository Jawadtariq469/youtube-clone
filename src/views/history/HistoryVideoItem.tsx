import { Button } from '../../components/elements';

import { VideoCard } from '../../components/ui';

import { ButtonHtmlType, ButtonSize, ButtonVariant } from '../../utils/enums';

import {
  HistoryVideoContainer,
  HistoryVideoFooter,
  HistoryWatchedAt,
} from './historyView.styles';

import type { HistoryVideoItemProps } from './types';

const formatWatchedAt = (watchedAt: string): string => {
  const watchedDate = new Date(watchedAt);

  if (Number.isNaN(watchedDate.getTime())) {
    return 'Recently watched';
  }

  return `Watched ${new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(watchedDate)}`;
};

const HistoryVideoItem = ({
  historyItem,
  isRemoving = false,
  onVideoSelect,
  onRemove,
}: HistoryVideoItemProps) => {
  return (
    <HistoryVideoContainer>
      <VideoCard video={historyItem} onSelect={onVideoSelect} />

      <HistoryVideoFooter>
        <HistoryWatchedAt>
          {formatWatchedAt(historyItem.watchedAt)}
        </HistoryWatchedAt>

        <Button
          type={ButtonHtmlType.Button}
          variant={ButtonVariant.Secondary}
          size={ButtonSize.Small}
          disabled={isRemoving}
          onClick={() => {
            onRemove(historyItem.id);
          }}
        >
          Remove
        </Button>
      </HistoryVideoFooter>
    </HistoryVideoContainer>
  );
};

export default HistoryVideoItem;
