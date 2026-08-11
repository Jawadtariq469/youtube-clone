import styled from 'styled-components';

import type { AppTheme } from '../../../theme/theme';

type CardButtonProps = {
  $appTheme: AppTheme;
};

export const CardButton = styled.button<CardButtonProps>`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 14px;
  background-color: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  transition:
    background-color 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    background-color: ${({ $appTheme }) =>
      `color-mix(
          in srgb,
          ${$appTheme.colors.text.primary} 10%,
          ${$appTheme.colors.background.page}
        )`};

    transform: translateY(-2px);

    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.text.primary};
    outline-offset: 3px;
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(128, 128, 128, 0.2);
`;

export const Thumbnail = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Duration = styled.span`
  position: absolute;
  right: 6px;
  bottom: 6px;
  padding: 3px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
`;

export const VideoInformation = styled.div`
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 12px;
  padding-top: 12px;
`;

export const ChannelAvatar = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.25);
`;

export const ChannelAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ChannelInitial = styled.span`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const Details = styled.div`
  min-width: 0;
`;

export const VideoTitle = styled.h3`
  display: -webkit-box;
  margin: 0 0 6px;
  overflow: hidden;
  color: inherit;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const ChannelTitle = styled.p`
  margin: 0 0 2px;
  overflow: hidden;
  color: inherit;
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.7;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Metadata = styled.p`
  margin: 0;
  color: inherit;
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.7;
`;
