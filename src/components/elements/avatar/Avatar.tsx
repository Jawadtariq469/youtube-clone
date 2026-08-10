import { useState } from 'react';

import { AppConstants, AppText } from '../../../constants';
import { useTheme } from '../../../store/global';
import { AvatarSize, ButtonHtmlType } from '../../../utils/enums';

import { AvatarButton, AvatarFallback, AvatarImage } from './avatar.styles';

import type { AvatarProps } from './types';

const getInitials = (name: string) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join(AppConstants.EmptyString)
    .toUpperCase();

  return initials || AppText.Common.UserFallbackInitial;
};

const Avatar = ({
  name,
  label,
  src,
  size = AvatarSize.Medium,
  ...buttonProps
}: AvatarProps) => {
  const [failedImageSrc, setFailedImageSrc] = useState<string | null>(null);

  const { theme } = useTheme();

  const shouldDisplayImage = Boolean(src) && failedImageSrc !== src;

  const handleImageError = () => {
    if (src) {
      setFailedImageSrc(src);
    }
  };

  const handleImageLoad = () => {
    setFailedImageSrc(null);
  };

  return (
    <AvatarButton
      {...buttonProps}
      type={ButtonHtmlType.Button}
      aria-label={label}
      $appTheme={theme}
      $size={size}
    >
      {shouldDisplayImage ? (
        <AvatarImage
          src={src}
          alt={name}
          draggable={false}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      ) : (
        <AvatarFallback $appTheme={theme} $size={size}>
          {getInitials(name)}
        </AvatarFallback>
      )}
    </AvatarButton>
  );
};

export default Avatar;
