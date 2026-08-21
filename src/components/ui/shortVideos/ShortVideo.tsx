import { useRecordWatchHistory } from '../../../store/history';

import { useTheme } from '../../../store/global';

import ShortActions from './ShortActions';
import ShortPlayer from './ShortPlayer';

import {
  ShortChannelAvatar,
  ShortChannelAvatarImage,
  ShortChannelRow,
  ShortChannelTitle,
  ShortMetadataOverlay,
  ShortPlayerContainer,
  ShortSlide,
  ShortStage,
  ShortVideoTitle,
} from './shortVideo.styles';

import type { ShortVideoProps } from './types';

const ShortVideo = ({ video, isActive, onOpenWatch }: ShortVideoProps) => {
  const { theme } = useTheme();

  /*
   * Only the currently active Short is
   * added to the signed-in user's history.
   */
  useRecordWatchHistory(isActive ? video : undefined);

  const channelInitial =
    video.channelTitle.trim().charAt(0).toLocaleUpperCase() || '?';

  return (
    <ShortSlide data-short-video-id={video.id} aria-label={video.title}>
      <ShortStage>
        <ShortPlayerContainer $appTheme={theme}>
          <ShortPlayer video={video} isActive={isActive} />

          <ShortMetadataOverlay>
            <ShortChannelRow>
              <ShortChannelAvatar>
                {video.channelAvatarUrl ? (
                  <ShortChannelAvatarImage
                    src={video.channelAvatarUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  channelInitial
                )}
              </ShortChannelAvatar>

              <ShortChannelTitle>{video.channelTitle}</ShortChannelTitle>
            </ShortChannelRow>

            <ShortVideoTitle>{video.title}</ShortVideoTitle>
          </ShortMetadataOverlay>
        </ShortPlayerContainer>

        <ShortActions video={video} onOpenWatch={onOpenWatch} />
      </ShortStage>
    </ShortSlide>
  );
};

export default ShortVideo;
