import type { IconProps } from '../../../utils/types';

const ShuffleIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={true} {...props}>
      <path
        d="M4 7H7.5C10.5 7 12.3 9.1 14 12C15.7 14.9 17.4 17 20 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M17 14L20 17L17 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M4 17H7.5C9.2 17 10.6 16.3 11.8 15.1M14 9C15.5 7.7 17.2 7 20 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M17 4L20 7L17 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShuffleIcon;
