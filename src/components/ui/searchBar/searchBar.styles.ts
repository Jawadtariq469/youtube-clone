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
  position: relative;

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

interface SuggestionsListProps {
  $appTheme: AppTheme;
}

interface SuggestionButtonProps {
  $appTheme: AppTheme;
  $isActive: boolean;
}

export const SuggestionsList = styled.ul<SuggestionsListProps>`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 1000;

  box-sizing: border-box;

  width: 100%;
  max-height: 440px;

  margin: 0;
  padding: 8px 0;

  overflow-x: hidden;
  overflow-y: auto;

  list-style: none;

  border: ${({ $appTheme }) => $appTheme.border.width.thin} solid
    ${({ $appTheme }) => $appTheme.colors.input.border};

  /* Don't use the pill-shaped input radius here */
  border-radius: 12px;

  background-color: ${({ $appTheme }) => $appTheme.colors.background.page};

  box-shadow: 0 4px 16px rgb(0 0 0 / 22%);
`;

export const SuggestionItem = styled.li`
  width: 100%;
`;

export const SuggestionButton = styled.button<SuggestionButtonProps>`
  display: flex;
  align-items: center;
  gap: 14px;

  width: 100%;
  min-height: 40px;

  padding: 8px 16px;

  border: none;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: ${({ $appTheme, $isActive }) =>
    $isActive ? $appTheme.colors.background.active : 'transparent'};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  font-size: 14px;
  font-weight: 500;
  text-align: left;

  cursor: pointer;

  &:hover {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.active};
  }
`;

export const SuggestionIconContainer = styled.span`
  display: inline-flex;
  flex-shrink: 0;

  width: 20px;
  height: 20px;

  & svg {
    width: 100%;
    height: 100%;
  }
`;

export const SuggestionsLoading = styled.li<SuggestionsListProps>`
  padding: 12px 16px;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};
`;
