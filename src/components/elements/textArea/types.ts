import type { TextareaHTMLAttributes } from 'react';

export interface TextAreaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'aria-label'
> {
  label: string;
  isFullWidth?: boolean;
}
