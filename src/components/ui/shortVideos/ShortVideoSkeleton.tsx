import { Skeleton } from '../../elements';

import {
  ShortActionSkeleton,
  ShortActionsContainer,
} from './shortActions.styles';

import {
  ShortPlayerContainer,
  ShortPlayerSkeleton,
  ShortSlide,
  ShortStage,
} from './shortVideo.styles';

import { useTheme } from '../../../store/global';

const ShortVideoSkeleton = () => {
  const { theme } = useTheme();

  return (
    <ShortSlide aria-label="Loading Shorts" aria-busy="true">
      <ShortStage>
        <ShortPlayerContainer $appTheme={theme}>
          <ShortPlayerSkeleton>
            <Skeleton width="100%" height="100%" borderRadius="14px" />
          </ShortPlayerSkeleton>
        </ShortPlayerContainer>

        <ShortActionsContainer>
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <ShortActionSkeleton key={index}>
              <Skeleton width="48px" height="48px" borderRadius="50%" />

              <Skeleton width="44px" height="11px" />
            </ShortActionSkeleton>
          ))}
        </ShortActionsContainer>
      </ShortStage>
    </ShortSlide>
  );
};

export default ShortVideoSkeleton;
