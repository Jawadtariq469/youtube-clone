import { useState } from 'react';

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
  SuggestionButton,
  SuggestionIconContainer,
  SuggestionItem,
  SuggestionsList,
  SuggestionsLoading,
} from './searchBar.styles';

import type { ChangeEvent, FocusEvent, FormEvent, KeyboardEvent } from 'react';
import type { SearchBarProps } from './types';

const EMPTY_SUGGESTIONS: readonly string[] = [];

const SearchBar = ({
  value,
  placeholder,
  inputLabel,
  buttonLabel,
  onChange,
  onSubmit,
  suggestions = EMPTY_SUGGESTIONS,
  isSuggestionsLoading = false,
  onSuggestionSelect,
  isDisabled = false,
}: SearchBarProps) => {
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const { theme } = useTheme();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);

    setActiveSuggestionIndex(-1);

    // Suggestions are allowed from one character.
    setIsSuggestionsOpen(event.target.value.trim().length > 0);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setIsSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);

    onSubmit(event);
  };

  const handleFormFocus = (): void => {
    if (value.trim().length > 0) {
      setIsSuggestionsOpen(true);
    }
  };

  const handleFormBlur = (event: FocusEvent<HTMLFormElement>): void => {
    const nextFocusedElement = event.relatedTarget;

    if (
      nextFocusedElement instanceof Node &&
      event.currentTarget.contains(nextFocusedElement)
    ) {
      return;
    }

    setIsSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
  };

  const selectSuggestion = (suggestion: string): void => {
    setIsSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);

    onSuggestionSelect?.(suggestion);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>): void => {
    if (event.key === 'ArrowDown' && suggestions.length > 0) {
      event.preventDefault();

      setIsSuggestionsOpen(true);

      setActiveSuggestionIndex((currentIndex) =>
        currentIndex >= suggestions.length - 1 ? 0 : currentIndex + 1,
      );

      return;
    }

    if (event.key === 'ArrowUp' && suggestions.length > 0) {
      event.preventDefault();

      setIsSuggestionsOpen(true);

      setActiveSuggestionIndex((currentIndex) =>
        currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1,
      );

      return;
    }

    if (event.key === 'Enter' && activeSuggestionIndex >= 0) {
      const activeSuggestion = suggestions[activeSuggestionIndex];

      if (activeSuggestion) {
        event.preventDefault();

        selectSuggestion(activeSuggestion);
      }

      return;
    }

    if (event.key === 'Escape') {
      setIsSuggestionsOpen(false);
      setActiveSuggestionIndex(-1);
    }
  };

  const shouldShowSuggestions =
    isSuggestionsOpen &&
    value.trim().length > 0 &&
    (isSuggestionsLoading || suggestions.length > 0);

  return (
    <SearchForm
      $appTheme={theme}
      role={HtmlRole.Search}
      onSubmit={handleFormSubmit}
      onFocus={handleFormFocus}
      onBlur={handleFormBlur}
      onKeyDown={handleKeyDown}
    >
      <SearchInputContainer>
        <SearchInput
          value={value}
          placeholder={placeholder}
          label={inputLabel}
          size={InputSize.Medium}
          isFullWidth
          hasEndButton
          disabled={isDisabled}
          onChange={handleInputChange}
        />

        {shouldShowSuggestions && (
          <SuggestionsList $appTheme={theme} role="listbox">
            {isSuggestionsLoading && suggestions.length === 0 && (
              <SuggestionsLoading $appTheme={theme}>
                Loading suggestions...
              </SuggestionsLoading>
            )}

            {suggestions.map((suggestion, index) => (
              <SuggestionItem key={`${suggestion}-${index}`}>
                <SuggestionButton
                  type="button"
                  role="option"
                  aria-selected={activeSuggestionIndex === index}
                  $appTheme={theme}
                  $isActive={activeSuggestionIndex === index}
                  onMouseEnter={() => setActiveSuggestionIndex(index)}
                  onClick={() => selectSuggestion(suggestion)}
                >
                  <SuggestionIconContainer>
                    <SearchIcon />
                  </SuggestionIconContainer>

                  {suggestion}
                </SuggestionButton>
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}
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
