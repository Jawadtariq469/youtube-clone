import { useTheme } from '../../../store/global';

import { SkeletonBlock } from './skeleton.styles';

import type { SkeletonProps } from './types';

const Skeleton = ({
  width = '100%',
  height = '16px',
  borderRadius = '4px',
  aspectRatio,
  className,
}: SkeletonProps) => {
  const { theme } = useTheme();

  return (
    <SkeletonBlock
      className={className}
      aria-hidden="true"
      $appTheme={theme}
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      $aspectRatio={aspectRatio}
    />
  );
};

export default Skeleton;
