import { PlayerContainer, PlayerFrame } from './videoPlayer.styles';

import type { VideoPlayerProps } from './types';

const VideoPlayer = ({ videoId, title, autoPlay = true }: VideoPlayerProps) => {
  const playerParameters = new URLSearchParams({
    autoplay: autoPlay ? '1' : '0',
    controls: '1',
    enablejsapi: '1',
    origin: window.location.origin,
    playsinline: '1',
    rel: '0',
  });

  const playerUrl =
    `https://www.youtube.com/embed/` +
    `${encodeURIComponent(videoId)}` +
    `?${playerParameters.toString()}`;

  return (
    <PlayerContainer>
      <PlayerFrame
        src={playerUrl}
        title={`${title} — YouTube video player`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </PlayerContainer>
  );
};

export default VideoPlayer;
