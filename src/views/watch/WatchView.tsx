import { useSearchParams } from 'react-router';

import { VideoPlayer } from '../../components/ui';
import { AppConstants, AppQueryParameters } from '../../constants';
import { useMediaQuery } from '../../hooks/useMediaQuerry';
import { useVideoDetails } from '../../hooks/useVideoDetails';
import { useRecordWatchHistory } from '../../store/history';

import WatchComments from './WatchComments';
import WatchInformation from './WatchInformation';
import WatchRecommendations from './WatchRecommendations';

import {
  CommentsColumn,
  PrimaryColumn,
  RecommendationsColumn,
  StatusMessage,
  WatchLayout,
  WatchPage,
} from './watchView.styles';

import type { WatchViewProps } from './types';

const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

const STACKED_LAYOUT_QUERY = '(max-width: 1100px)';

const WatchView = ({ autoPlay = true, onVideoSelect }: WatchViewProps) => {
  const [searchParameters] = useSearchParams();

  const isStackedLayout = useMediaQuery(STACKED_LAYOUT_QUERY);

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

  const shouldDisplayComments = !isPending && !isError && Boolean(video);

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

          {/*
           * Desktop:
           * comments stay underneath the video
           * in the left column.
           */}
          {!isStackedLayout && shouldDisplayComments && video && (
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

        {/*
         * Tablet/mobile:
         * recommendations render first,
         * followed by comments.
         */}
        {isStackedLayout && shouldDisplayComments && video && (
          <CommentsColumn>
            <WatchComments key={video.id} videoId={video.id} />
          </CommentsColumn>
        )}
      </WatchLayout>
    </WatchPage>
  );
};

export default WatchView;
