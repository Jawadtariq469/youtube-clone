import { useTheme } from '../../../store/global';

import {
  ChannelAvatar,
  ChannelAvatarImage,
  ChannelInformation,
  ChannelInitial,
  ChannelTitle,
  Description,
  Duration,
  Metadata,
  ResultInformation,
  SearchResultButton,
  Thumbnail,
  ThumbnailContainer,
  VideoTitle,
} from './searchResultCard.styles';

import type { SearchResultCardProps } from './types';

const timeUnits = [
  {
    label: 'year',
    milliseconds: 365 * 24 * 60 * 60 * 1000,
  },
  {
    label: 'month',
    milliseconds: 30 * 24 * 60 * 60 * 1000,
  },
  {
    label: 'week',
    milliseconds: 7 * 24 * 60 * 60 * 1000,
  },
  {
    label: 'day',
    milliseconds: 24 * 60 * 60 * 1000,
  },
  {
    label: 'hour',
    milliseconds: 60 * 60 * 1000,
  },
  {
    label: 'minute',
    milliseconds: 60 * 1000,
  },
] as const;

const formatViewCount = (viewCount: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(viewCount);
};

const formatPublishedAt = (publishedAt: string): string => {
  const publishedTime = new Date(publishedAt).getTime();

  if (Number.isNaN(publishedTime)) {
    return '';
  }

  const difference = Math.max(0, Date.now() - publishedTime);

  const selectedUnit = timeUnits.find(
    ({ milliseconds }) => difference >= milliseconds,
  );

  if (!selectedUnit) {
    return 'Just now';
  }

  const amount = Math.floor(difference / selectedUnit.milliseconds);

  return `${amount} ${selectedUnit.label}${amount === 1 ? '' : 's'} ago`;
};

const SearchResultCard = ({ video, onSelect }: SearchResultCardProps) => {
  const { theme } = useTheme();

  const channelInitial = video.channelTitle.trim().charAt(0) || '?';

  const publishedAt = formatPublishedAt(video.publishedAt);

  const handleSelect = (): void => {
    onSelect?.(video.id);
  };

  return (
    <SearchResultButton
      type="button"
      $appTheme={theme}
      onClick={handleSelect}
      aria-label={`Open ${video.title}`}
    >
      <ThumbnailContainer>
        <Thumbnail src={video.thumbnailUrl} alt={video.title} loading="lazy" />

        {video.duration && <Duration>{video.duration}</Duration>}
      </ThumbnailContainer>

      <ResultInformation>
        <VideoTitle>{video.title}</VideoTitle>

        <Metadata>
          {formatViewCount(video.viewCount)} views
          {publishedAt && ` • ${publishedAt}`}
        </Metadata>

        <ChannelInformation>
          <ChannelAvatar>
            {video.channelAvatarUrl ? (
              <ChannelAvatarImage src={video.channelAvatarUrl} alt="" />
            ) : (
              <ChannelInitial>{channelInitial}</ChannelInitial>
            )}
          </ChannelAvatar>

          <ChannelTitle>{video.channelTitle}</ChannelTitle>
        </ChannelInformation>

        {video.description && <Description>{video.description}</Description>}
      </ResultInformation>
    </SearchResultButton>
  );
};

export default SearchResultCard;
