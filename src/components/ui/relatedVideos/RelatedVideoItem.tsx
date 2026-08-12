import { useState } from 'react';

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
  ThumbnailFallback,
} from './relatedVideos.styles';

import type { RelatedVideoItemProps } from './types';

const RelatedVideoItem = ({ video, onVideoSelect }: RelatedVideoItemProps) => {
  const { theme } = useTheme();

  const [thumbnailSource, setThumbnailSource] = useState(video.thumbnailUrl);

  const [isThumbnailUnavailable, setIsThumbnailUnavailable] = useState(false);

  const fallbackThumbnailUrl = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

  const handleVideoSelect = (): void => {
    onVideoSelect(video.id);
  };

  const handleThumbnailError = (): void => {
    if (thumbnailSource !== fallbackThumbnailUrl) {
      setThumbnailSource(fallbackThumbnailUrl);

      return;
    }

    setIsThumbnailUnavailable(true);
  };

  return (
    <RelatedVideoButton
      type="button"
      $appTheme={theme}
      aria-label={`Play ${video.title}`}
      onClick={handleVideoSelect}
    >
      <ThumbnailContainer>
        {isThumbnailUnavailable ? (
          <ThumbnailFallback
            role="img"
            aria-label={`Thumbnail unavailable for ${video.title}`}
          >
            Thumbnail unavailable
          </ThumbnailFallback>
        ) : (
          <Thumbnail
            src={thumbnailSource}
            alt={video.title}
            loading="lazy"
            onError={handleThumbnailError}
          />
        )}

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
