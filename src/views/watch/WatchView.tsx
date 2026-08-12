import { useSearchParams } from 'react-router';
import { useRecordWatchHistory } from '../../store/history';
import { VideoPlayer } from '../../components/ui';
import { AppConstants, AppQueryParameters } from '../../constants';
import { useVideoDetails } from '../../hooks/useVideoDetails';

import WatchInformation from './WatchInformation';
import WatchRecommendations from './WatchRecommendations';
import WatchComments from './WatchComments';
import {
  PrimaryColumn,
  RecommendationsColumn,
  StatusMessage,
  WatchLayout,
  WatchPage,
} from './watchView.styles';

import type { WatchViewProps } from './types';

const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

const WatchView = ({ autoPlay = true, onVideoSelect }: WatchViewProps) => {
  const [searchParameters] = useSearchParams();

  const videoId =
    searchParameters.get(AppQueryParameters.VideoId)?.trim() ??
    AppConstants.EmptyString;

  const isValidVideoId = VIDEO_ID_PATTERN.test(videoId);

  const {
    data: video,
    isPending,
    isError,
    error,
  } = useVideoDetails(isValidVideoId ? videoId : AppConstants.EmptyString);
  useRecordWatchHistory(video);
  if (!videoId) {
    return <StatusMessage>No video was selected.</StatusMessage>;
  }

  if (!isValidVideoId) {
    return <StatusMessage>The video ID is invalid.</StatusMessage>;
  }

  return (
    <WatchPage>
      <WatchLayout>
        <PrimaryColumn>
          <VideoPlayer
            videoId={videoId}
            title={video?.title ?? 'YouTube video'}
            autoPlay={autoPlay}
          />

          <WatchInformation
            video={video}
            isLoading={isPending}
            isError={isError}
            error={error}
          />

          {!isPending && !isError && video && (
            <WatchComments key={video.id} videoId={video.id} />
          )}
        </PrimaryColumn>

        <RecommendationsColumn>
          <WatchRecommendations
            video={video}
            currentVideoId={videoId}
            isVideoLoading={isPending}
            onVideoSelect={onVideoSelect}
          />
        </RecommendationsColumn>
      </WatchLayout>
    </WatchPage>
  );
};

export default WatchView;
