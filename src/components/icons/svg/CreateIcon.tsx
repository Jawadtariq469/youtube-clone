import type { IconProps } from '../../../utils/types';

const CreateIcon = (props: IconProps) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden={true} {...props}>
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CreateIcon;
