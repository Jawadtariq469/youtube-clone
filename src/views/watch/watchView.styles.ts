import styled from 'styled-components';

import type { AppTheme } from '../../theme';

interface ThemeProps {
  $appTheme: AppTheme;
}

interface DescriptionTextProps {
  $isExpanded: boolean;
}

interface ActionButtonProps extends ThemeProps {
  $isActive?: boolean;
}

export const WatchPage = styled.section`
  width: 100%;
  max-width: 1800px;

  margin: 0 auto;
`;

export const WatchLayout = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(320px, 402px);

  grid-template-areas:
    'primary recommendations'
    'primary recommendations';

  align-items: start;
  column-gap: 24px;

  width: 100%;

  @media (max-width: 1100px) {
    grid-template-columns: minmax(0, 1fr);

    grid-template-areas:
      'primary'
      'recommendations'
      'comments';
  }
`;
export const PrimaryColumn = styled.div`
  grid-area: primary;

  min-width: 0;
`;

export const RecommendationsColumn = styled.div`
  grid-area: recommendations;

  min-width: 0;

  @media (max-width: 1100px) {
    margin-top: 28px;
  }
`;

export const CommentsColumn = styled.div`
  grid-area: comments;

  min-width: 0;
`;

export const WatchInformation = styled.div`
  padding: 14px 4px 0;

  @media (max-width: 600px) {
    padding: 12px 0 0;
  }
`;

export const VideoTitle = styled.h1`
  margin: 0;

  color: inherit;

  font-size: 20px;
  font-weight: 600;
  line-height: 1.35;

  overflow-wrap: anywhere;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const VideoActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px 20px;

  margin-top: 14px;

  @media (max-width: 760px) {
    align-items: stretch;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 14px;
  }
`;

export const ChannelActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  flex: 1 1 auto;
  min-width: 260px;

  @media (max-width: 760px) {
    flex: none;

    width: 100%;
    min-width: 0;
  }

  @media (max-width: 480px) {
    justify-content: space-between;
  }
`;

export const ChannelInformation = styled.button<ThemeProps>`
  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 0;

  padding: 0;

  border: none;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  text-align: left;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.text.primary};

    outline-offset: 3px;

    border-radius: 6px;
  }
`;

export const ChannelAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 40px;
  height: 40px;

  overflow: hidden;

  border-radius: 50%;

  background-color: rgb(128 128 128 / 25%);
`;

export const ChannelAvatarImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const ChannelInitial = styled.span`
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const ChannelTitle = styled.p`
  min-width: 0;
  margin: 0;

  overflow: hidden;

  color: inherit;

  font-size: 14px;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SubscribeButton = styled.button<SubscribeButtonProps>`
  min-height: 36px;

  padding: 0 18px;

  border: none;
  border-radius: 18px;

  color: ${({ $appTheme, $isSubscribed }) =>
    $isSubscribed
      ? $appTheme.colors.text.primary
      : $appTheme.colors.background.page};

  background-color: ${({ $appTheme, $isSubscribed }) =>
    $isSubscribed
      ? $appTheme.colors.background.secondary
      : $appTheme.colors.text.primary};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.active};
  }

  &:disabled {
    cursor: wait;

    opacity: 0.65;
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.text.primary};

    outline-offset: 2px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  flex: 0 0 auto;
  flex-wrap: wrap;

  max-width: 100%;

  @media (max-width: 760px) {
    justify-content: flex-start;

    width: 100%;
    max-width: none;

    overflow: visible;
  }
`;

export const ActionButton = styled.button<ActionButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  flex-shrink: 0;

  min-height: 36px;

  padding: 0 16px;

  border: none;
  border-radius: 18px;

  color: ${({ $appTheme, $isActive }) =>
    $isActive ? $appTheme.colors.state.success : $appTheme.colors.text.primary};

  background-color: ${({ $appTheme, $isActive }) =>
    $isActive
      ? $appTheme.colors.state.successBackground
      : $appTheme.colors.background.secondary};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.active};
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.border.focus};

    outline-offset: 2px;
  }

  svg {
    width: 18px;
    height: 18px;

    flex-shrink: 0;
  }
`;

export const DescriptionBox = styled.section<ThemeProps>`
  margin-top: 16px;
  padding: 12px;

  border-radius: 12px;

  background-color: ${({ $appTheme }) => $appTheme.colors.background.secondary};
`;

export const DescriptionMetadata = styled.p`
  margin: 0 0 8px;

  color: inherit;

  font-size: 14px;
  font-weight: 600;
`;

export const DescriptionText = styled.p<DescriptionTextProps>`
  display: ${({ $isExpanded }) => ($isExpanded ? 'block' : '-webkit-box')};

  margin: 0;

  overflow: hidden;

  color: inherit;

  font-size: 14px;
  line-height: 1.5;

  white-space: pre-wrap;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $isExpanded }) => ($isExpanded ? 'unset' : '3')};
`;

export const DescriptionToggle = styled.button`
  margin-top: 8px;
  padding: 0;

  border: none;

  color: inherit;

  background-color: transparent;

  font: inherit;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
`;

export const StatusMessage = styled.p`
  margin: 18px 4px;

  color: inherit;

  font-size: 15px;
`;

export const LoadingInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 18px 4px 0;
`;

export const LoadingChannel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  margin-top: 6px;
`;
interface SubscribeButtonProps extends ThemeProps {
  $isSubscribed: boolean;
}
