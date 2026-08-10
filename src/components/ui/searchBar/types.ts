import type { ChangeEventHandler, FormEventHandler } from 'react';

export interface SearchBarProps {
  value: string;
  placeholder: string;
  inputLabel: string;
  buttonLabel: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isDisabled?: boolean;
}
