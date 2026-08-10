import { forwardRef } from 'react';

import { useTheme } from '../../../store/global';
import { InputHtmlType, InputSize } from '../../../utils/enums';

import { StyledSearchInput } from './searchInput.styles';
import type { SearchInputProps } from './types';

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      label,
      size = InputSize.Medium,
      isFullWidth = false,
      hasEndButton = false,
      ...inputProps
    },
    ref,
  ) => {
    const { theme } = useTheme();

    return (
      <StyledSearchInput
        {...inputProps}
        ref={ref}
        type={InputHtmlType.Search}
        aria-label={label}
        $appTheme={theme}
        $size={size}
        $isFullWidth={isFullWidth}
        $hasEndButton={hasEndButton}
      />
    );
  },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
