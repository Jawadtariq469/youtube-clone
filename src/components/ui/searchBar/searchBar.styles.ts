import styled from 'styled-components';

import type { AppTheme } from '../../../theme';

interface SearchFormProps {
  $appTheme: AppTheme;
}

interface SearchButtonContainerProps {
  $appTheme: AppTheme;
}

export const SearchForm = styled.form<SearchFormProps>`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;

  width: 100%;
  max-width: ${({ $appTheme }) => $appTheme.header.searchWidth.max};
`;

export const SearchInputContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SearchButtonContainer = styled.div<SearchButtonContainerProps>`
  display: flex;
  flex-shrink: 0;

  & > button {
    width: ${({ $appTheme }) => $appTheme.header.searchButtonWidth};

    border: ${({ $appTheme }) => $appTheme.border.width.thin} solid
      ${({ $appTheme }) => $appTheme.colors.input.border};

    border-left: none;

    border-radius: 0 ${({ $appTheme }) => $appTheme.input.radius}
      ${({ $appTheme }) => $appTheme.input.radius} 0;

    color: ${({ $appTheme }) => $appTheme.colors.icon.primary};

    background-color: ${({ $appTheme }) =>
      $appTheme.colors.background.secondary};
  }

  & > button:hover:not(:disabled) {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.active};
  }
`;
