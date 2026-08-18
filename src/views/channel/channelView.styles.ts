import styled from 'styled-components';

export const ChannelPage = styled.section`
  width: 100%;
  max-width: 1800px;
  min-width: 0;

  margin: 0 auto;
`;

export const ChannelVideosHeading = styled.h2`
  margin: 0 0 18px;

  color: inherit;

  font-size: 20px;
  font-weight: 600;
`;

export const ChannelStatusPanel = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  min-height: 220px;
`;

export const ChannelStatusMessage = styled.p`
  max-width: 540px;

  margin: 0;

  overflow-wrap: anywhere;

  color: inherit;

  font-size: 15px;
  line-height: 1.5;

  opacity: 0.75;
`;
