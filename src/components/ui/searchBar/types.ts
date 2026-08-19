import type { ChangeEventHandler, FormEventHandler } from 'react';

export interface SearchBarProps {
  value: string;

  placeholder: string;

  inputLabel: string;

  buttonLabel: string;

  onChange: ChangeEventHandler<HTMLInputElement>;

  onSubmit: FormEventHandler<HTMLFormElement>;

  suggestions?: readonly string[];

  isSuggestionsLoading?: boolean;
  hasSuggestionsError?: boolean;
  onSuggestionSelect?: (suggestion: string) => void;

  isDisabled?: boolean;
}
