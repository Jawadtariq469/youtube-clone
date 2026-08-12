import { useState } from 'react';

import { AppConstants, AppText } from '../../../constants';
import { useTheme } from '../../../store/global';
import { AvatarSize, ButtonHtmlType } from '../../../utils/enums';

import { AvatarButton, AvatarFallback, AvatarImage } from './avatar.styles';

import type { AvatarProps } from './types';

const getInitials = (name: string): string => {
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
  const isInteractive = typeof buttonProps.onClick === 'function';

  const handleImageError = (): void => {
    if (src) {
      setFailedImageSrc(src);
    }
  };

  const handleImageLoad = (): void => {
    setFailedImageSrc(null);
  };

  const avatarContent = shouldDisplayImage ? (
    <AvatarImage
      src={src}
      alt=""
      draggable={false}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  ) : (
    <AvatarFallback $appTheme={theme} $size={size}>
      {getInitials(name)}
    </AvatarFallback>
  );

  if (!isInteractive) {
    return (
      <AvatarButton
        as="span"
        role="img"
        aria-label={label}
        $appTheme={theme}
        $size={size}
        style={{ cursor: 'default' }}
      >
        {avatarContent}
      </AvatarButton>
    );
  }

  return (
    <AvatarButton
      {...buttonProps}
      type={ButtonHtmlType.Button}
      aria-label={label}
      $appTheme={theme}
      $size={size}
    >
      {avatarContent}
    </AvatarButton>
  );
};

export default Avatar;
