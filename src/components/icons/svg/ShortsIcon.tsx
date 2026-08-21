import type { IconProps } from '../../../utils/types';

const ShortsIcon = (props: IconProps) => {
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
      <path
        d="
          M14.8 2.4
          8.7 5.9
          C7.1 6.8 6.6 8.9 7.5 10.5
          L8.4 12
          6.7 13
          C5.1 13.9 4.6 16 5.5 17.6
          L7 20.2
          C7.9 21.8 10 22.3 11.6 21.4
          L17.4 18.1
          C19 17.2 19.5 15.1 18.6 13.5
          L17.7 12
          19.4 11
          C21 10.1 21.5 8 20.6 6.4
          L19.1 3.8
          C18.2 2.2 16.4 1.5 14.8 2.4
          Z
        "
      />

      <path
        d="M10.3 8.7L15.5 12L10.3 15.3V8.7Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
};

export default ShortsIcon;
