import type { IconProps } from '../../../utils/types';

const HistoryIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={true} {...props}>
      <path
        d="M4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12C20 16.4 16.4 20 12 20C8.8 20 6 18.1 4.7 15.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M4 7V12H9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M12 8V12L15 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HistoryIcon;
