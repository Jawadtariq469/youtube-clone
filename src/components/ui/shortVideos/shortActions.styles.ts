import styled from 'styled-components';

import type { AppTheme } from '../../../theme';

interface ShortActionButtonProps {
  $appTheme: AppTheme;
  $isActive: boolean;
}

export const ShortActionsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;

  flex-shrink: 0;

  @media (max-width: 760px) {
    position: absolute;
    right: 12px;
    bottom: 88px;

    z-index: 4;

    gap: 14px;
  }
`;

export const ShortActionButton = styled.button<ShortActionButtonProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;

  padding: 0;

  border: none;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.text.primary};

    outline-offset: 4px;
    border-radius: 50%;
  }
`;

export const ShortActionIcon = styled.span<ShortActionButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  border-radius: 50%;

  color: ${({ $isActive }) => ($isActive ? '#ff0033' : 'inherit')};

  background-color: ${({ $appTheme }) => $appTheme.colors.background.secondary};

  transition:
    color 150ms ease,
    background-color 150ms ease,
    transform 150ms ease;

  ${ShortActionButton}:hover & {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.active};

    transform: scale(1.05);
  }

  @media (max-width: 760px) {
    color: ${({ $isActive }) => ($isActive ? '#ff4e6d' : '#ffffff')};

    background-color: rgb(0 0 0 / 55%);
  }
`;

export const ShortActionLabel = styled.span`
  font-size: 12px;
  font-weight: 600;

  @media (max-width: 760px) {
    color: #ffffff;

    text-shadow: 0 1px 3px rgb(0 0 0 / 70%);
  }
`;

export const ShortActionSkeleton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;
`;
