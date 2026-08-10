import type { InputHTMLAttributes } from 'react';

import type { TInputSize } from '../../../utils/enums';

export interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'aria-label'
> {
  label: string;
  size?: TInputSize;
  isFullWidth?: boolean;
  hasEndButton?: boolean;
}
