import type { IconProps } from '../../../utils/types';

const SubscriptionsIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={true} {...props}>
      <path
        d="M7 4H17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M5 7H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <rect
        x="3"
        y="10"
        width="18"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path d="M10 13.5L15 16L10 18.5V13.5Z" fill="currentColor" />
    </svg>
  );
};

export default SubscriptionsIcon;
