import { IconButton, SearchInput } from '../../elements';
import { SearchIcon } from '../../icons';
import { useTheme } from '../../../store/global';
import {
  ButtonHtmlType,
  HtmlRole,
  IconButtonSize,
  InputSize,
} from '../../../utils/enums';

import {
  SearchButtonContainer,
  SearchForm,
  SearchInputContainer,
} from './searchBar.styles';

import type { SearchBarProps } from './types';

const SearchBar = ({
  value,
  placeholder,
  inputLabel,
  buttonLabel,
  onChange,
  onSubmit,
  isDisabled = false,
}: SearchBarProps) => {
  const { theme } = useTheme();

  return (
    <SearchForm $appTheme={theme} role={HtmlRole.Search} onSubmit={onSubmit}>
      <SearchInputContainer>
        <SearchInput
          value={value}
          placeholder={placeholder}
          label={inputLabel}
          onChange={onChange}
          size={InputSize.Medium}
          isFullWidth
          hasEndButton
          disabled={isDisabled}
        />
      </SearchInputContainer>

      <SearchButtonContainer $appTheme={theme}>
        <IconButton
          icon={<SearchIcon />}
          label={buttonLabel}
          size={IconButtonSize.Medium}
          htmlType={ButtonHtmlType.Submit}
          disabled={isDisabled}
        />
      </SearchButtonContainer>
    </SearchForm>
  );
};

export default SearchBar;
