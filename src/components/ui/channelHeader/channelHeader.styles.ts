import styled from 'styled-components';

export const ChannelHeaderContainer = styled.header`
  width: 100%;

  margin-bottom: 32px;
`;

export const ChannelBanner = styled.div`
  width: 100%;
  aspect-ratio: 6 / 1;

  overflow: hidden;

  border-radius: 14px;

  background: linear-gradient(120deg, #252525, #5e5e5e, #202020);

  @media (max-width: 600px) {
    aspect-ratio: 4 / 1;

    border-radius: 10px;
  }
`;

export const ChannelBannerImage = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const ChannelSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  padding: 24px 12px 0;

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;

    padding: 18px 4px 0;
  }
`;

export const ChannelAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 112px;
  height: 112px;

  overflow: hidden;

  border-radius: 50%;

  background-color: rgb(128 128 128 / 25%);

  font-size: 32px;
  font-weight: 700;

  @media (max-width: 700px) {
    width: 82px;
    height: 82px;

    font-size: 25px;
  }
`;

export const ChannelAvatarImage = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const ChannelTextContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChannelName = styled.h1`
  margin: 0;

  overflow-wrap: anywhere;

  color: inherit;

  font-size: clamp(24px, 3vw, 34px);
  font-weight: 700;
  line-height: 1.25;
`;

export const ChannelMetadata = styled.p`
  margin: 7px 0 0;

  color: inherit;

  font-size: 14px;
  line-height: 1.45;

  opacity: 0.7;
`;

export const ChannelDescription = styled.p`
  display: -webkit-box;

  max-width: 760px;

  margin: 12px 0 0;

  overflow: hidden;

  overflow-wrap: anywhere;

  color: inherit;

  font-size: 14px;
  line-height: 1.5;

  opacity: 0.8;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const ChannelActionContainer = styled.div`
  flex-shrink: 0;

  @media (max-width: 700px) {
    width: 100%;

    & > button {
      width: 100%;
    }
  }
`;
