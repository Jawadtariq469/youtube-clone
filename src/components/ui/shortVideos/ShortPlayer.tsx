import { PlayFilledIcon } from '../../icons';

import {
  ShortPlayerFrame,
  ShortPlayIndicator,
  ShortThumbnail,
} from './shortVideo.styles';

import type { SyntheticEvent } from 'react';

import type { ShortPlayerProps } from './types';

const ShortPlayer = ({ video, isActive }: ShortPlayerProps) => {
  const handleThumbnailError = (
    event: SyntheticEvent<HTMLImageElement>,
  ): void => {
    const thumbnail = event.currentTarget;

    if (thumbnail.dataset.fallbackApplied === 'true') {
      return;
    }

    thumbnail.dataset.fallbackApplied = 'true';

    thumbnail.src = `https://i.ytimg.com/vi/` + `${video.id}/hqdefault.jpg`;
  };

  if (!isActive) {
    return (
      <>
        <ShortThumbnail
          src={video.thumbnailUrl}
          alt=""
          loading="lazy"
          onError={handleThumbnailError}
        />

        <ShortPlayIndicator>
          <PlayFilledIcon />
        </ShortPlayIndicator>
      </>
    );
  }

  const playerParameters = new URLSearchParams({
    autoplay: '1',
    controls: '1',

    enablejsapi: '1',
    origin: window.location.origin,

    playsinline: '1',
    rel: '0',

    loop: '1',
    playlist: video.id,
  });

  const playerUrl =
    `https://www.youtube.com/embed/` +
    `${encodeURIComponent(video.id)}` +
    `?${playerParameters.toString()}`;

  return (
    <ShortPlayerFrame
      src={playerUrl}
      title={`${video.title} — YouTube Short`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
};

export default ShortPlayer;
