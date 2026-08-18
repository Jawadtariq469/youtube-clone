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

  box-sizing: border-box;

  @media (max-width: 760px) {
    padding: 0;

    background-color: #000000;
  }
`;

export const ShortStage = styled.div`
  position: relative;

  display: flex;
  align-items: flex-end;
  gap: 14px;

  width: fit-content;
  max-width: 100%;

  height: min(760px, calc(100% - 24px));

  @media (max-width: 760px) {
    display: block;

    width: 100%;
    height: 100%;
  }
`;

export const ShortPlayerContainer = styled.div<ShortPlayerContainerProps>`
  position: relative;

  flex-shrink: 0;

  height: 100%;
  aspect-ratio: 9 / 16;

  overflow: hidden;

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

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
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

  box-sizing: border-box;

  @media (max-width: 760px) {
    /*
     * Right padding reserves space for
     * the mobile action buttons.
     */
    padding: 110px 78px calc(58px + env(safe-area-inset-bottom)) 16px;
  }

  @media (max-width: 400px) {
    min-height: 215px;

    padding-top: 95px;
    padding-right: 70px;
  }

  @media (max-width: 760px) and (max-height: 700px) {
    min-height: 200px;

    padding-top: 85px;
  }
`;

export const ShortChannelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;

  min-width: 0;

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
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const ShortChannelTitle = styled.p`
  min-width: 0;
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

  overflow-wrap: anywhere;

  text-shadow: 0 1px 3px rgb(0 0 0 / 75%);

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const ShortPlayerSkeleton = styled.div`
  width: 100%;
  height: 100%;
`;
