import styled from 'styled-components';

import type { AppTheme } from '../../theme';

interface ThemeProps {
  $appTheme: AppTheme;
}

interface FilterButtonProps extends ThemeProps {
  $isActive: boolean;
}

interface SummaryActionButtonProps {
  $isPrimary?: boolean;
}

interface MenuButtonProps extends ThemeProps {
  $isDanger?: boolean;
}

export const LikedVideosPage = styled.section`
  width: 100%;
  max-width: 1600px;
  min-width: 0;

  margin: 0 auto;
`;

export const LikedVideosStandaloneHeader = styled.header`
  margin-bottom: 24px;
`;

export const LikedVideosStandaloneTitle = styled.h1`
  margin: 0;

  color: inherit;

  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;

  @media (max-width: 600px) {
    font-size: 23px;
  }
`;

export const LikedVideosLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 360px) minmax(0, 1fr);
  align-items: start;
  gap: clamp(24px, 3vw, 42px);

  width: 100%;
  min-width: 0;

  @media (max-width: 1100px) {
    grid-template-columns: minmax(280px, 320px) minmax(0, 1fr);
    gap: 24px;
  }

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const LikedVideosSummaryCard = styled.aside<ThemeProps>`
  position: sticky;

  top: calc(${({ $appTheme }) => $appTheme.header.height.desktop} + 12px);

  width: 100%;
  min-width: 0;

  min-height: calc(
    100dvh - ${({ $appTheme }) => $appTheme.header.height.desktop} - 36px
  );

  overflow: hidden;

  border-radius: 16px;

  color: #ffffff;
  background-color: #263238;

  box-shadow: 0 10px 30px rgb(0 0 0 / 20%);

  @media (max-width: 900px) {
    position: relative;
    top: auto;

    min-height: 0;
  }
`;

export const SummaryBackgroundImage = styled.img`
  position: absolute;

  inset: -36px;

  width: calc(100% + 72px);
  height: calc(100% + 72px);

  object-fit: cover;

  filter: blur(34px) saturate(0.85);

  opacity: 0.6;

  transform: scale(1.08);
`;

export const SummaryOverlay = styled.div`
  position: absolute;

  inset: 0;

  background:
    linear-gradient(180deg, rgb(20 24 26 / 22%), rgb(12 14 15 / 92%)),
    linear-gradient(135deg, rgb(77 111 117 / 78%), rgb(75 39 32 / 82%));
`;

export const SummaryContent = styled.div`
  position: relative;

  z-index: 1;

  display: flex;
  flex-direction: column;

  min-height: inherit;

  padding: 24px;

  box-sizing: border-box;

  @media (max-width: 1100px) {
    padding: 20px;
  }

  @media (max-width: 900px) {
    display: grid;

    grid-template-columns: minmax(180px, 280px) minmax(0, 1fr);

    align-items: center;

    gap: 22px;

    min-height: 0;
  }

  @media (max-width: 620px) {
    display: flex;

    gap: 0;
  }
`;

export const SummaryThumbnailContainer = styled.div`
  position: relative;

  width: 100%;

  aspect-ratio: 16 / 9;

  margin: 0 auto 22px;

  overflow: hidden;

  border-radius: 12px;

  background-color: rgb(0 0 0 / 22%);

  box-shadow: 0 10px 30px rgb(0 0 0 / 28%);

  @media (max-width: 900px) {
    margin: 0;
  }

  @media (max-width: 620px) {
    margin: 0 auto 20px;
  }
`;

export const SummaryThumbnail = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: contain;
`;

export const SummaryInformation = styled.div`
  min-width: 0;
`;

export const SummaryTitle = styled.h1`
  margin: 0 0 18px;

  color: inherit;

  font-size: 28px;
  font-weight: 700;
  line-height: 1.25;

  @media (max-width: 1100px) {
    font-size: 24px;
  }
`;

export const SummaryOwner = styled.p`
  margin: 0 0 7px;

  overflow: hidden;

  color: inherit;

  font-size: 14px;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SummaryMetadata = styled.p`
  margin: 0;

  color: rgb(255 255 255 / 72%);

  font-size: 12px;
  line-height: 1.5;
`;

export const SummaryIconActions = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  margin-top: 18px;
`;

export const SummaryMenuContainer = styled.div`
  position: relative;
`;

export const SummaryIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  padding: 0;

  border: none;
  border-radius: 50%;

  color: #ffffff;

  background-color: rgb(255 255 255 / 16%);

  cursor: pointer;

  &:hover {
    background-color: rgb(255 255 255 / 25%);
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const SummaryMoreMenu = styled.div`
  position: absolute;

  top: 48px;
  left: 0;

  z-index: 20;

  width: 230px;

  padding: 8px;

  border: 1px solid rgb(255 255 255 / 14%);
  border-radius: 12px;

  background-color: #242424;

  box-shadow: 0 10px 30px rgb(0 0 0 / 35%);
`;

export const SummaryMoreMenuButton = styled.button`
  display: flex;
  align-items: center;

  gap: 12px;

  width: 100%;
  min-height: 42px;

  padding: 8px 10px;

  border: none;
  border-radius: 8px;

  color: #ffffff;

  background-color: transparent;

  font: inherit;
  font-size: 14px;

  text-align: left;

  cursor: pointer;

  &:hover {
    background-color: rgb(255 255 255 / 12%);
  }

  svg {
    width: 21px;
    height: 21px;
  }
`;

export const SummaryPrimaryActions = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 10px;

  margin-top: 18px;

  @media (max-width: 440px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const SummaryPrimaryButton = styled.button<SummaryActionButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  min-height: 42px;

  padding: 0 14px;

  border: none;
  border-radius: 21px;

  color: ${({ $isPrimary }) => ($isPrimary ? '#111111' : '#ffffff')};

  background-color: ${({ $isPrimary }) =>
    $isPrimary ? '#ffffff' : 'rgb(255 255 255 / 16%)'};

  font: inherit;
  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  &:hover {
    opacity: 0.88;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }

  svg {
    width: 21px;
    height: 21px;
  }
`;

export const LikedVideosContent = styled.div`
  min-width: 0;
`;

export const LikedVideosFilterBar = styled.nav`
  display: flex;

  gap: 8px;

  width: 100%;

  margin-bottom: 16px;

  overflow-x: auto;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LikedVideosFilterButton = styled.button<FilterButtonProps>`
  flex-shrink: 0;

  min-height: 32px;

  padding: 6px 13px;

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

  cursor: pointer;

  &:hover {
    opacity: 0.84;
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};

    outline-offset: 2px;
  }
`;

export const LikedVideosList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;

  min-width: 0;
`;

export const LikedVideoContainer = styled.article<ThemeProps>`
  position: relative;

  display: grid;

  grid-template-columns: minmax(0, 1fr) 44px;

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

export const LikedVideoButton = styled.button<ThemeProps>`
  display: grid;

  grid-template-columns: 200px minmax(0, 1fr);

  align-items: start;

  gap: 10px;

  width: 100%;
  min-width: 0;

  padding: 8px;

  border: none;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  text-align: left;

  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};

    outline-offset: 2px;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 170px minmax(0, 1fr);
  }

  @media (max-width: 540px) {
    grid-template-columns: minmax(130px, 42%) minmax(0, 1fr);

    gap: 8px;

    padding: 6px 2px;
  }
`;

export const LikedVideoThumbnailContainer = styled.div`
  position: relative;

  width: 100%;

  aspect-ratio: 16 / 9;

  overflow: hidden;

  border-radius: 9px;

  background-color: rgb(128 128 128 / 20%);
`;

export const LikedVideoThumbnail = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const LikedVideoDuration = styled.span`
  position: absolute;

  right: 5px;
  bottom: 5px;

  padding: 3px 4px;

  border-radius: 4px;

  color: #ffffff;

  background-color: rgb(0 0 0 / 82%);

  font-size: 12px;
  font-weight: 700;
  line-height: 1.1;
`;

export const LikedVideoInformation = styled.div`
  min-width: 0;

  padding-top: 2px;
`;

export const LikedVideoTitle = styled.h2`
  display: -webkit-box;

  margin: 0 0 7px;

  overflow: hidden;

  color: inherit;

  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;

  overflow-wrap: anywhere;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: 540px) {
    margin-bottom: 5px;

    font-size: 13px;
  }
`;

export const LikedVideoMetadata = styled.p`
  margin: 0;

  overflow: hidden;

  color: inherit;

  font-size: 12px;
  line-height: 1.45;

  opacity: 0.68;

  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 540px) {
    display: -webkit-box;

    overflow: hidden;

    white-space: normal;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

export const LikedVideoActions = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  padding-top: 7px;
`;

export const LikedVideoMoreButton = styled.button<ThemeProps>`
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

export const LikedVideoActionMenu = styled.div<ThemeProps>`
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

export const LikedVideoActionMenuButton = styled.button<MenuButtonProps>`
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

export const LikedVideoActionIcon = styled.span`
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

export const LikedVideosStatusPanel = styled.div`
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

export const LikedVideosStatusMessage = styled.p`
  max-width: 520px;

  margin: 0;

  overflow-wrap: anywhere;

  color: inherit;

  font-size: 15px;
  line-height: 1.5;

  opacity: 0.75;
`;

export const LikedVideosErrorNotice = styled.p<ThemeProps>`
  margin: 0 0 20px;

  padding: 12px 14px;

  border: 1px solid ${({ $appTheme }) => $appTheme.colors.state.error};
  border-radius: 10px;

  color: ${({ $appTheme }) => $appTheme.colors.state.error};

  background-color: ${({ $appTheme }) =>
    $appTheme.colors.state.errorBackground};

  font-size: 14px;
  line-height: 1.45;
`;
export const LikedShortsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(180px, 220px));

  align-items: start;
  justify-content: start;

  gap: 26px 5px;

  width: 100%;
  min-width: 0;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));

    gap: 24px 8px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 22px 8px;
  }
`;

export const LikedShortContainer = styled.article`
  min-width: 0;
`;

export const LikedShortThumbnailButton = styled.button<ThemeProps>`
  display: block;

  width: 100%;

  padding: 0;

  border: none;
  border-radius: 12px;

  background-color: transparent;

  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};

    outline-offset: 3px;
  }
`;

export const LikedShortThumbnailContainer = styled.div`
  position: relative;

  width: 100%;

  aspect-ratio: 9 / 16;

  overflow: hidden;

  border-radius: 12px;

  background-color: rgb(128 128 128 / 20%);
`;

export const LikedShortThumbnail = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: transform 160ms ease;

  ${LikedShortThumbnailButton}:hover & {
    transform: scale(1.015);
  }
`;

export const LikedShortInformationRow = styled.div`
  display: grid;

  grid-template-columns: minmax(0, 1fr) 38px;

  align-items: start;

  gap: 2px;

  min-width: 0;

  padding-top: 9px;
`;

export const LikedShortTextButton = styled.button<ThemeProps>`
  display: block;

  min-width: 0;

  padding: 0;

  border: none;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  text-align: left;

  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};

    outline-offset: 2px;
  }
`;

export const LikedShortInformation = styled.span`
  display: block;

  min-width: 0;
`;

export const LikedShortTitle = styled.span`
  display: -webkit-box;

  min-width: 0;

  margin: 0 0 6px;

  overflow: hidden;

  color: inherit;

  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;

  overflow-wrap: anywhere;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const LikedShortMetadata = styled.span`
  display: block;

  overflow: hidden;

  color: inherit;

  font-size: 12px;
  line-height: 1.4;

  opacity: 0.68;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LikedShortActionMenu = styled(LikedVideoActionMenu)`
  width: min(210px, calc(100vw - 24px));

  @media (max-width: 600px) {
    width: min(190px, calc(100vw - 24px));
  }
`;
