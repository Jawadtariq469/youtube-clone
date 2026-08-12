import { forwardRef } from 'react';

import { useTheme } from '../../../store/global';

import { StyledTextArea } from './textArea.styles';

import type { TextAreaProps } from './types';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, isFullWidth = false, ...textAreaProps }, ref) => {
    const { theme } = useTheme();

    return (
      <StyledTextArea
        {...textAreaProps}
        ref={ref}
        aria-label={label}
        $appTheme={theme}
        $isFullWidth={isFullWidth}
      />
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
