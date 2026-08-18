import styled from 'styled-components';

import type { AppTheme } from '../../../theme';

interface SearchResultButtonProps {
  $appTheme: AppTheme;
}

export const SearchResultButton = styled.button<SearchResultButtonProps>`
  display: grid;
  grid-template-columns:
    minmax(300px, 500px)
    minmax(0, 1fr);
  align-items: start;
  gap: 16px;

  width: 100%;
  max-width: 1200px;
  min-width: 0;

  padding: 8px;

  border: none;
  border-radius: 12px;

  color: ${({ $appTheme }) => $appTheme.colors.text.primary};

  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};

  text-align: left;

  cursor: pointer;
  touch-action: manipulation;

  box-sizing: border-box;

  transition:
    background-color 180ms ease,
    transform 180ms ease;

  /*
     * Apply hover movement only on devices
     * that actually support mouse hovering.
     */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ $appTheme }) =>
        `color-mix(
            in srgb,
            ${$appTheme.colors.text.primary} 8%,
            ${$appTheme.colors.background.page}
          )`};

      transform: translateY(-2px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.text.primary};

    outline-offset: 2px;
  }

  @media (max-width: 900px) {
    grid-template-columns:
      minmax(260px, 42%)
      minmax(0, 1fr);
  }

  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0;

    padding: 0 0 4px;
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;

  width: 100%;
  min-width: 0;

  aspect-ratio: 16 / 9;

  overflow: hidden;

  border-radius: 12px;

  background-color: rgb(128 128 128 / 20%);

  @media (max-width: 480px) {
    border-radius: 10px;
  }
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

  color: #ffffff;
  background-color: rgb(0 0 0 / 80%);

  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
`;

export const ResultInformation = styled.div`
  min-width: 0;

  padding-top: 4px;

  @media (max-width: 700px) {
    padding: 10px 4px 0;
  }
`;

export const VideoTitle = styled.h3`
  display: -webkit-box;

  margin: 0 0 6px;

  overflow: hidden;

  color: inherit;

  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;

  overflow-wrap: anywhere;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: 700px) {
    font-size: 16px;
  }

  @media (max-width: 400px) {
    font-size: 15px;
  }
`;

export const Metadata = styled.p`
  margin: 0;

  overflow: hidden;

  color: inherit;

  font-size: 13px;
  line-height: 1.4;

  opacity: 0.7;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChannelInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 0;

  margin-top: 18px;

  @media (max-width: 700px) {
    margin-top: 12px;
  }
`;

export const ChannelAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 28px;
  height: 28px;

  overflow: hidden;

  border-radius: 50%;

  background-color: rgb(128 128 128 / 25%);
`;

export const ChannelAvatarImage = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const ChannelInitial = styled.span`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const ChannelTitle = styled.p`
  min-width: 0;

  margin: 0;

  overflow: hidden;

  color: inherit;

  font-size: 13px;

  opacity: 0.75;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Description = styled.p`
  display: -webkit-box;

  margin: 14px 0 0;

  overflow: hidden;

  color: inherit;

  font-size: 13px;
  line-height: 1.45;

  opacity: 0.75;

  overflow-wrap: anywhere;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: 700px) {
    display: none;
  }
`;
