import { useTheme } from '../../../store/global';
import {
  formatPublishedAt,
  formatViewCount,
} from '../../../utils/videoFormatters';

import {
  Duration,
  RelatedChannelTitle,
  RelatedMetadata,
  RelatedVideoButton,
  RelatedVideoDetails,
  RelatedVideoTitle,
  Thumbnail,
  ThumbnailContainer,
} from './relatedVideos.styles';

import type { RelatedVideoItemProps } from './types';

const RelatedVideoItem = ({ video, onVideoSelect }: RelatedVideoItemProps) => {
  const { theme } = useTheme();

  const handleVideoSelect = (): void => {
    onVideoSelect(video.id);
  };

  return (
    <RelatedVideoButton
      type="button"
      $appTheme={theme}
      aria-label={`Play ${video.title}`}
      onClick={handleVideoSelect}
    >
      <ThumbnailContainer>
        <Thumbnail src={video.thumbnailUrl} alt={video.title} loading="lazy" />

        {video.duration && <Duration>{video.duration}</Duration>}
      </ThumbnailContainer>

      <RelatedVideoDetails>
        <RelatedVideoTitle>{video.title}</RelatedVideoTitle>

        <RelatedChannelTitle>{video.channelTitle}</RelatedChannelTitle>

        <RelatedMetadata>
          {formatViewCount(video.viewCount)} views
          {' • '}
          {formatPublishedAt(video.publishedAt)}
        </RelatedMetadata>
      </RelatedVideoDetails>
    </RelatedVideoButton>
  );
};

export default RelatedVideoItem;
