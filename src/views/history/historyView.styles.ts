import styled, { keyframes } from 'styled-components';
import type { AppTheme } from '../../theme';

interface ThemeProps {
  $appTheme: AppTheme;
}

interface HistoryFilterButtonProps extends ThemeProps {
  $isActive: boolean;
}

interface HistoryActionMenuButtonProps extends ThemeProps {
  $isDanger?: boolean;
}
const historyLoadingRotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
export const HistoryPage = styled.section`
  width: 100%;
  max-width: 1440px;
  min-width: 0;

  margin: 0 auto;
`;

export const HistoryLayout = styled.div`
  display: grid;
  grid-template-areas:
    'header controls'
    'content controls';
  grid-template-columns: minmax(0, 920px) minmax(300px, 360px);
  align-items: start;
  justify-content: center;
  column-gap: clamp(40px, 6vw, 96px);

  width: 100%;
  min-width: 0;

  @media (max-width: 1150px) {
    grid-template-areas:
      'header'
      'controls'
      'content';
    grid-template-columns: minmax(0, 1fr);
    row-gap: 24px;
  }
`;

export const HistoryHeader = styled.header`
  grid-area: header;
  min-width: 0;

  padding-top: 12px;
  margin-bottom: 26px;

  @media (max-width: 600px) {
    padding-top: 4px;
    margin-bottom: 18px;
  }
`;

export const HistoryTitle = styled.h1`
  margin: 0 0 12px;

  color: inherit;

  font-size: 32px;
  font-weight: 700;
  line-height: 1.25;

  @media (max-width: 600px) {
    font-size: 25px;
  }
`;

export const HistoryFilterBar = styled.nav`
  display: flex;
  gap: 8px;

  width: 100%;

  overflow-x: auto;
  overscroll-behavior-inline: contain;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HistoryFilterButton = styled.button<HistoryFilterButtonProps>`
  flex-shrink: 0;

  min-height: 32px;
  padding: 6px 12px;

  border: none;
  border-radius: 8px;

  color: ${({ $appTheme, $isActive }) =>
    $isActive
      ? $appTheme.colors.background.page
      : $appTheme.colors.text.primary};

  background-color: ${({ $appTheme, $isActive }) =>
    $isActive
      ? $appTheme.colors.text.primary
      : $appTheme.colors.background.secondary};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;

  cursor: pointer;

  transition:
    color ${({ $appTheme }) => $appTheme.transition.duration.fast},
    background-color ${({ $appTheme }) => $appTheme.transition.duration.fast};

  &:hover {
    background-color: ${({ $appTheme, $isActive }) =>
      $isActive
        ? $appTheme.colors.text.primary
        : $appTheme.colors.background.active};
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};
    outline-offset: 2px;
  }
`;

export const HistoryContent = styled.div`
  grid-area: content;
  min-width: 0;
`;

export const HistoryLoadingPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 14px;

  width: 100%;
  min-height: 260px;

  color: inherit;
`;

export const HistoryLoadingSpinner = styled.span<ThemeProps>`
  display: block;

  width: 34px;
  height: 34px;

  border: 3px solid ${({ $appTheme }) => $appTheme.colors.border.subtle};
  border-top-color: ${({ $appTheme }) => $appTheme.colors.text.primary};
  border-radius: 50%;

  animation: ${historyLoadingRotation} 750ms linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 1500ms;
  }
`;

export const HistoryLoadingText = styled.p`
  margin: 0;

  color: inherit;

  font-size: 14px;
  line-height: 1.4;

  opacity: 0.7;
`;

export const HistoryPausedNotice = styled.p<ThemeProps>`
  margin: 0 0 22px;
  padding: 12px 14px;

  border: 1px solid ${({ $appTheme }) => $appTheme.colors.border.subtle};
  border-radius: 10px;

  color: ${({ $appTheme }) => $appTheme.colors.text.secondary};
  background-color: ${({ $appTheme }) => $appTheme.colors.background.secondary};

  font-size: 14px;
  line-height: 1.45;
`;

export const HistoryDateSection = styled.section`
  min-width: 0;

  margin-bottom: 34px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const HistoryDateTitle = styled.h2`
  margin: 0 0 10px;

  color: inherit;

  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
`;

export const HistoryItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  min-width: 0;
`;

export const HistoryVideoContainer = styled.article<ThemeProps>`
  position: relative;

  display: grid;
  grid-template-columns: minmax(0, 1fr) 42px;
  align-items: start;

  width: 100%;
  min-width: 0;

  border-radius: 12px;

  transition: background-color
    ${({ $appTheme }) => $appTheme.transition.duration.fast};

  &:hover {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.hover};
  }
`;

export const HistoryVideoButton = styled.button<ThemeProps>`
  display: grid;
  grid-template-columns: minmax(220px, 260px) minmax(0, 1fr);
  align-items: start;
  gap: 16px;

  width: 100%;
  min-width: 0;

  padding: 8px;
  border: none;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};
  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  text-align: left;

  cursor: pointer;

  box-sizing: border-box;

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};
    outline-offset: 2px;
  }

  @media (max-width: 720px) {
    grid-template-columns: minmax(170px, 42%) minmax(0, 1fr);
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: minmax(135px, 43%) minmax(0, 1fr);
    gap: 10px;

    padding: 6px 2px;
  }
`;

export const HistoryThumbnailContainer = styled.div`
  position: relative;

  width: 100%;
  min-width: 0;

  aspect-ratio: 16 / 9;

  overflow: hidden;

  border-radius: 9px;

  background-color: rgb(128 128 128 / 20%);
`;

export const HistoryThumbnail = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const HistoryDuration = styled.span`
  position: absolute;
  right: 5px;
  bottom: 5px;

  padding: 3px 4px;

  border-radius: 4px;

  color: #ffffff;
  background-color: rgb(0 0 0 / 82%);

  font-size: 12px;
  font-weight: 600;
  line-height: 1.1;
`;

export const HistoryVideoInformation = styled.div`
  min-width: 0;

  padding-top: 3px;
`;

export const HistoryVideoTitle = styled.h3`
  display: -webkit-box;

  margin: 0 0 7px;

  overflow: hidden;

  color: inherit;

  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  overflow-wrap: anywhere;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: 520px) {
    margin-bottom: 5px;

    font-size: 14px;
  }
`;

export const HistoryMetadata = styled.p`
  margin: 0;

  overflow: hidden;

  color: inherit;

  font-size: 12px;
  line-height: 1.45;

  opacity: 0.7;

  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 520px) {
    white-space: normal;

    display: -webkit-box;
    overflow: hidden;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

export const HistoryVideoDescription = styled.p`
  display: -webkit-box;

  margin: 14px 0 0;

  overflow: hidden;

  color: inherit;

  font-size: 12px;
  line-height: 1.45;
  overflow-wrap: anywhere;

  opacity: 0.68;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: 720px) {
    display: none;
  }
`;

export const HistoryActions = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  padding-top: 7px;
`;

export const HistoryMoreButton = styled.button<ThemeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  padding: 0;
  border: none;
  border-radius: 50%;

  color: ${({ $appTheme }) => $appTheme.colors.icon.primary};
  background-color: transparent;

  cursor: pointer;

  &:hover {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.active};
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};
    outline-offset: 2px;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const HistoryActionMenu = styled.div<ThemeProps>`
  position: absolute;
  top: 42px;
  right: 4px;
  z-index: 30;

  width: min(270px, calc(100vw - 32px));
  padding: 8px;

  border: 1px solid ${({ $appTheme }) => $appTheme.colors.border.subtle};
  border-radius: 12px;

  background-color: ${({ $appTheme }) => $appTheme.colors.background.elevated};

  box-shadow: 0 8px 26px rgb(0 0 0 / 28%);
`;

export const HistoryActionMenuButton = styled.button<HistoryActionMenuButtonProps>`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;
  min-height: 42px;

  padding: 8px 10px;
  border: none;
  border-radius: 8px;

  color: ${({ $appTheme, $isDanger }) =>
    $isDanger ? $appTheme.colors.state.error : $appTheme.colors.text.primary};
  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  font-size: 14px;
  font-weight: 500;
  text-align: left;

  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.active};
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const HistoryActionIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 22px;
  height: 22px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const HistoryControls = styled.aside<ThemeProps>`
  position: sticky;
  top: calc(${({ $appTheme }) => $appTheme.header.height.desktop} + 24px);

  grid-area: controls;

  width: 100%;
  min-width: 0;
  padding-top: 68px;

  @media (max-width: 1150px) {
    position: static;

    max-width: 560px;
    padding: 0 0 20px;

    border-bottom: 1px solid
      ${({ $appTheme }) => $appTheme.colors.border.subtle};
  }
`;

export const HistorySearchField = styled.label<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;

  border-bottom: 1px solid ${({ $appTheme }) => $appTheme.colors.border.strong};

  color: ${({ $appTheme }) => $appTheme.colors.icon.secondary};

  &:focus-within {
    border-color: ${({ $appTheme }) => $appTheme.colors.border.focus};
  }

  svg {
    flex-shrink: 0;

    width: 23px;
    height: 23px;
  }
`;

export const HistorySearchInput = styled.input<ThemeProps>`
  flex: 1;
  min-width: 0;

  height: 42px;

  padding: 0;
  border: none;
  outline: none;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};
  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  font-size: 14px;

  &::placeholder {
    color: ${({ $appTheme }) => $appTheme.colors.text.muted};
  }

  &::-webkit-search-cancel-button {
    cursor: pointer;
  }
`;

export const HistoryControlList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin-top: 26px;
`;

export const HistoryControlButton = styled.button<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 14px;

  width: 100%;
  min-height: 48px;

  padding: 8px 4px;
  border: none;
  border-radius: 8px;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};
  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  font-size: 14px;
  font-weight: 600;
  text-align: left;

  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.hover};
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

export const HistoryControlLink = styled.a<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 14px;

  width: 100%;
  min-height: 48px;

  padding: 8px 4px;
  border-radius: 8px;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;

  box-sizing: border-box;

  &:hover {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.hover};
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};
    outline-offset: 2px;
  }
`;

export const HistoryControlIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const HistoryStatusPanel = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  min-height: 220px;

  @media (max-width: 600px) {
    min-height: 180px;
  }
`;

export const HistoryStatusMessage = styled.p`
  max-width: 520px;

  margin: 0;

  overflow-wrap: anywhere;

  color: inherit;

  font-size: 15px;
  line-height: 1.5;

  opacity: 0.75;
`;
