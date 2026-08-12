import styled from 'styled-components';

import type { AppTheme } from '../../../theme';

interface ShortPlayerContainerProps {
  $appTheme: AppTheme;
}

export const ShortSlide = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  min-height: 100%;

  padding: 12px 24px;

  scroll-snap-align: start;
  scroll-snap-stop: always;

  @media (max-width: 760px) {
    padding: 0;
  }
`;

export const ShortStage = styled.div`
  position: relative;

  display: flex;
  align-items: flex-end;
  gap: 14px;

  height: min(760px, calc(100% - 24px));

  max-width: 100%;

  @media (max-width: 760px) {
    display: block;

    width: 100%;
    height: 100%;
  }
`;

export const ShortPlayerContainer = styled.div<ShortPlayerContainerProps>`
  position: relative;

  height: 100%;
  aspect-ratio: 9 / 16;

  overflow: hidden;
  flex-shrink: 0;

  border-radius: 14px;

  background-color: #000000;

  box-shadow: 0 8px 28px rgb(0 0 0 / 22%);

  @media (max-width: 760px) {
    width: 100%;
    height: 100%;
    aspect-ratio: auto;

    border-radius: 0;

    box-shadow: none;
  }
`;

export const ShortPlayerFrame = styled.iframe`
  position: absolute;
  inset: 0;

  display: block;

  width: 100%;
  height: 100%;

  border: none;
`;

export const ShortThumbnail = styled.img`
  position: absolute;
  inset: 0;

  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const ShortPlayIndicator = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;

  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 58px;
  height: 58px;

  border-radius: 50%;

  color: #ffffff;
  background-color: rgb(0 0 0 / 55%);

  transform: translate(-50%, -50%);
`;

export const ShortMetadataOverlay = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 3;

  display: flex;
  flex-direction: column;
  gap: 8px;

  min-height: 230px;

  /*
   * Extra bottom padding keeps the text above
   * the embedded YouTube controls.
   */
  padding: 110px 18px 58px;

  color: #ffffff;

  background: linear-gradient(
    to bottom,
    rgb(0 0 0 / 0%) 0%,
    rgb(0 0 0 / 25%) 35%,
    rgb(0 0 0 / 75%) 75%,
    rgb(0 0 0 / 95%) 100%
  );

  pointer-events: none;
`;

export const ShortChannelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  margin-bottom: 9px;
`;

export const ShortChannelAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 34px;
  height: 34px;

  overflow: hidden;

  border: 1px solid rgb(255 255 255 / 45%);

  border-radius: 50%;

  color: #111111;
  background-color: #ffffff;

  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const ShortChannelAvatarImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const ShortChannelTitle = styled.p`
  margin: 0;

  overflow: hidden;

  font-size: 14px;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;

  text-shadow: 0 1px 3px rgb(0 0 0 / 75%);
`;

export const ShortVideoTitle = styled.h2`
  display: -webkit-box;

  margin: 0;

  overflow: hidden;

  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;

  text-shadow: 0 1px 3px rgb(0 0 0 / 75%);

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const ShortPlayerSkeleton = styled.div`
  width: 100%;
  height: 100%;
`;
