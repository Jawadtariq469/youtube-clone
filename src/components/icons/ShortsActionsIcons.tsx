import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export const LikeOutlineIcon = (iconProps: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...iconProps}
  >
    <path d="M7 10v11H3V10h4Z" />

    <path d="M7 19c2 1.3 4.1 2 6.5 2h2.2a3 3 0 0 0 2.9-2.2l1.9-7A3 3 0 0 0 17.6 8H14l.7-3.2A2.3 2.3 0 0 0 12.5 2L7 10v9Z" />
  </svg>
);

export const CommentOutlineIcon = (iconProps: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...iconProps}
  >
    <path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 10 10 0 0 1-4.2-.9L3 21l1.8-4.5A8.5 8.5 0 1 1 21 11.5Z" />
  </svg>
);

export const ShareOutlineIcon = (iconProps: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...iconProps}
  >
    <path d="M14 5l5 5-5 5" />

    <path d="M19 10h-7a7 7 0 0 0-7 7v2" />
  </svg>
);

export const PlayFilledIcon = (iconProps: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="currentColor"
    aria-hidden="true"
    {...iconProps}
  >
    <path d="M8 5v14l11-7L8 5Z" />
  </svg>
);
