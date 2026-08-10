import type { IconProps } from '../../../utils/types';

const YouTubeIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 28 20" aria-hidden={true} {...props}>
      <rect
        className="youtube-icon-background"
        width="28"
        height="20"
        rx="6"
        fill="currentColor"
      />

      <path
        className="youtube-icon-play"
        d="M11 6L19 10L11 14V6Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default YouTubeIcon;
