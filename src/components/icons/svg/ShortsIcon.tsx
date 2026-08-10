import type { IconProps } from '../../../utils/types';

const HomeIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={true} {...props}>
      <path
        d="M3 11.5L12 4L21 11.5V21H15V15H9V21H3V11.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
