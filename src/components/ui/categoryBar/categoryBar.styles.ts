import styled from 'styled-components';

import type { AppTheme } from '../../../theme/theme';

type CategoryBarContainerProps = {
  $appTheme: AppTheme;
};

type CategoryButtonProps = {
  $appTheme: AppTheme;
  $isActive: boolean;
};

export const CategoryBarContainer = styled.nav<CategoryBarContainerProps>`
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 4px 0 12px;
  overflow: hidden;
  background-color: ${({ $appTheme }) => $appTheme.colors.background.page};
`;

export const CategoryList = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryButton = styled.button<CategoryButtonProps>`
  flex-shrink: 0;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;

  background-color: ${({ $appTheme, $isActive }) =>
    $isActive
      ? $appTheme.colors.text.primary
      : `color-mix(
            in srgb,
            ${$appTheme.colors.text.primary} 10%,
            ${$appTheme.colors.background.page}
          )`};

  color: ${({ $appTheme, $isActive }) =>
    $isActive
      ? $appTheme.colors.background.page
      : $appTheme.colors.text.primary};

  font: inherit;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;

  transition:
    background-color 150ms ease,
    color 150ms ease;

  &:hover {
    background-color: ${({ $appTheme, $isActive }) =>
      $isActive
        ? $appTheme.colors.text.primary
        : `color-mix(
              in srgb,
              ${$appTheme.colors.text.primary} 16%,
              ${$appTheme.colors.background.page}
            )`};
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.text.primary};
    outline-offset: 2px;
  }
`;
