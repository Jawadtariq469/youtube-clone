import {
  CardButton,
  ChannelAvatar,
  ChannelAvatarImage,
  ChannelInitial,
  ChannelTitle,
  Details,
  Duration,
  Metadata,
  Thumbnail,
  ThumbnailContainer,
  VideoInformation,
  VideoTitle,
} from './videoCard.styles';
import { useTheme } from '../../../store/global';
import type { VideoCardProps } from './types';

const viewCountFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const formatViewCount = (viewCount: number): string => {
  return `${viewCountFormatter.format(viewCount)} views`;
};

const formatPublishedAt = (publishedAt: string): string => {
  const publishedDate = new Date(publishedAt);
  const currentDate = new Date();

  const differenceInMilliseconds =
    currentDate.getTime() - publishedDate.getTime();

  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24),
  );

  if (differenceInDays < 1) {
    return 'Today';
  }

  if (differenceInDays < 7) {
    return `${differenceInDays} day${differenceInDays === 1 ? '' : 's'} ago`;
  }

  if (differenceInDays < 30) {
    const weeks = Math.floor(differenceInDays / 7);

    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  }

  if (differenceInDays < 365) {
    const months = Math.floor(differenceInDays / 30);

    return `${months} month${months === 1 ? '' : 's'} ago`;
  }

  const years = Math.floor(differenceInDays / 365);

  return `${years} year${years === 1 ? '' : 's'} ago`;
};

const VideoCard = ({ video, onSelect }: VideoCardProps) => {
  const { theme } = useTheme();
  const {
    id,
    title,
    thumbnailUrl,
    channelTitle,
    channelAvatarUrl,
    viewCount,
    publishedAt,
    duration,
  } = video;

  const handleSelect = (): void => {
    onSelect?.(id);
  };

  const channelInitial = channelTitle.trim().charAt(0) || '?';

  return (
    <CardButton
      type="button"
      $appTheme={theme}
      aria-label={`Watch ${title}`}
      onClick={handleSelect}
    >
      <ThumbnailContainer>
        <Thumbnail
          src={thumbnailUrl}
          alt={`Thumbnail for ${title}`}
          loading="lazy"
        />

        {duration && <Duration>{duration}</Duration>}
      </ThumbnailContainer>

      <VideoInformation>
        <ChannelAvatar>
          {channelAvatarUrl ? (
            <ChannelAvatarImage
              src={channelAvatarUrl}
              alt={`${channelTitle} channel`}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <ChannelInitial>{channelInitial}</ChannelInitial>
          )}
        </ChannelAvatar>

        <Details>
          <VideoTitle>{title}</VideoTitle>

          <ChannelTitle>{channelTitle}</ChannelTitle>

          <Metadata>
            {formatViewCount(viewCount)}
            {' • '}
            {formatPublishedAt(publishedAt)}
          </Metadata>
        </Details>
      </VideoInformation>
    </CardButton>
  );
};

export default VideoCard;
