import type { IconProps } from '../../../utils/types';

const NotificationIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={true} {...props}>
      <path
        d="M18 9C18 5.7 15.3 3 12 3C8.7 3 6 5.7 6 9V13L4 16H20L18 13V9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M9.5 19C10 20.2 10.8 21 12 21C13.2 21 14 20.2 14.5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default NotificationIcon;
