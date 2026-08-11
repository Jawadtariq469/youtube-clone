import styled from 'styled-components';

import type { AppTheme } from '../../theme';

interface ThemeProps {
  $appTheme: AppTheme;
}

interface DescriptionTextProps {
  $isExpanded: boolean;
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
  align-items: start;
  gap: 24px;

  width: 100%;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const PrimaryColumn = styled.div`
  min-width: 0;
`;

export const RecommendationsColumn = styled.div`
  min-width: 0;
`;

export const WatchInformation = styled.div`
  padding: 14px 4px 0;
`;

export const VideoTitle = styled.h1`
  margin: 0;

  color: inherit;

  font-size: 20px;
  font-weight: 600;
  line-height: 1.35;
`;

export const VideoActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  margin-top: 14px;

  @media (max-width: 760px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }
`;

export const ChannelActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ChannelInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  margin: 0;

  color: inherit;

  font-size: 14px;
  font-weight: 600;
`;

export const SubscribeButton = styled.button<ThemeProps>`
  min-height: 36px;

  padding: 0 18px;

  border: none;
  border-radius: 18px;

  color: ${({ $appTheme }) => $appTheme.colors.background.page};

  background-color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  flex-wrap: wrap;
`;

export const ActionButton = styled.button<ThemeProps>`
  min-height: 36px;

  padding: 0 16px;

  border: none;
  border-radius: 18px;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: ${({ $appTheme }) => $appTheme.colors.background.secondary};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.active};
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
