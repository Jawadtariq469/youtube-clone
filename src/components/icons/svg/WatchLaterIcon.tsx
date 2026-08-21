import type { IconProps } from '../../../utils/types';

const WatchLaterIcon = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={true}
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" />

      <path d="M12 7.5V12L15.5 14" />
    </svg>
  );
};

export default WatchLaterIcon;
