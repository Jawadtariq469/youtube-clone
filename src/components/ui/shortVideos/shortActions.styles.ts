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

    right: max(10px, env(safe-area-inset-right));

    bottom: calc(88px + env(safe-area-inset-bottom));

    z-index: 4;

    gap: 14px;
  }

  @media (max-width: 480px) {
    right: max(8px, env(safe-area-inset-right));

    gap: 12px;
  }

  @media (max-width: 760px) and (max-height: 700px) {
    bottom: calc(70px + env(safe-area-inset-bottom));

    gap: 10px;
  }
`;

export const ShortActionButton = styled.button<ShortActionButtonProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;

  flex-shrink: 0;

  padding: 0;
  border: none;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  cursor: pointer;
  touch-action: manipulation;

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;

    border-radius: 50%;
  }

  @media (max-width: 760px) {
    color: #ffffff;
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

  @media (hover: hover) and (pointer: fine) {
    ${ShortActionButton}:hover & {
      background-color: ${({ $appTheme }) =>
        $appTheme.colors.background.active};

      transform: scale(1.05);
    }
  }

  @media (max-width: 760px) {
    color: ${({ $isActive }) => ($isActive ? '#ff4e6d' : '#ffffff')};

    background-color: rgb(0 0 0 / 58%);
  }

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: 760px) and (max-height: 700px) {
    width: 40px;
    height: 40px;
  }
`;

export const ShortActionLabel = styled.span`
  font-size: 12px;
  font-weight: 600;

  @media (max-width: 760px) {
    color: #ffffff;

    text-shadow: 0 1px 3px rgb(0 0 0 / 70%);
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const ShortActionSkeleton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 6px;
`;
