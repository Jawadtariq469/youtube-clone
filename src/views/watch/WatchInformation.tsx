import { Skeleton } from '../../components/elements';
import { useTheme } from '../../store/global';
import {
  formatPublishedDate,
  formatViewCount,
} from '../../utils/videoFormatters';

import ExpandableDescription from './ExpandableDescription';

import {
  ActionButton,
  ActionButtons,
  ChannelActions,
  ChannelAvatar,
  ChannelAvatarImage,
  ChannelInformation,
  ChannelInitial,
  ChannelTitle,
  DescriptionBox,
  DescriptionMetadata,
  LoadingChannel,
  LoadingInformation,
  StatusMessage,
  SubscribeButton,
  VideoActionsRow,
  VideoTitle,
  WatchInformation as WatchInformationContainer,
} from './watchView.styles';

import type { WatchInformationProps } from './types';

const WatchInformation = ({
  video,
  isLoading,
  isError,
  error,
}: WatchInformationProps) => {
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <LoadingInformation
        aria-label="Loading video information"
        aria-busy="true"
      >
        <Skeleton width="85%" height="22px" />

        <LoadingChannel>
          <Skeleton width="40px" height="40px" borderRadius="50%" />

          <Skeleton width="160px" height="15px" />
        </LoadingChannel>

        <Skeleton width="100%" height="100px" borderRadius="12px" />
      </LoadingInformation>
    );
  }

  if (isError) {
    return (
      <StatusMessage>
        Failed to load video information:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </StatusMessage>
    );
  }

  if (!video) {
    return <StatusMessage>This video could not be found.</StatusMessage>;
  }

  return (
    <WatchInformationContainer>
      <VideoTitle>{video.title}</VideoTitle>

      <VideoActionsRow>
        <ChannelActions>
          <ChannelInformation>
            <ChannelAvatar>
              {video.channelAvatarUrl ? (
                <ChannelAvatarImage src={video.channelAvatarUrl} alt="" />
              ) : (
                <ChannelInitial>
                  {video.channelTitle.trim().charAt(0) || '?'}
                </ChannelInitial>
              )}
            </ChannelAvatar>

            <ChannelTitle>{video.channelTitle}</ChannelTitle>
          </ChannelInformation>

          <SubscribeButton type="button" $appTheme={theme}>
            Subscribe
          </SubscribeButton>
        </ChannelActions>

        <ActionButtons>
          <ActionButton type="button" $appTheme={theme}>
            👍 Like
          </ActionButton>

          <ActionButton type="button" $appTheme={theme}>
            Share
          </ActionButton>

          <ActionButton
            type="button"
            $appTheme={theme}
            aria-label="More actions"
          >
            •••
          </ActionButton>
        </ActionButtons>
      </VideoActionsRow>

      <DescriptionBox $appTheme={theme}>
        <DescriptionMetadata>
          {formatViewCount(video.viewCount)} views
          {' • '}
          {formatPublishedDate(video.publishedAt)}
        </DescriptionMetadata>

        {video.description && (
          <ExpandableDescription
            key={video.id}
            description={video.description}
          />
        )}
      </DescriptionBox>
    </WatchInformationContainer>
  );
};

export default WatchInformation;
