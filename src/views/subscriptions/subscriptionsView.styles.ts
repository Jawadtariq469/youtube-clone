import styled from 'styled-components';

export const SubscriptionsPage = styled.section`
  width: 100%;
  max-width: 1800px;
  min-width: 0;

  margin: 0 auto;
`;

export const SubscriptionsHeader = styled.header`
  margin-bottom: 24px;

  @media (max-width: 600px) {
    margin-bottom: 18px;
  }
`;

export const SubscriptionsTitle = styled.h1`
  margin: 0;

  color: inherit;

  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;

  @media (max-width: 600px) {
    font-size: 21px;
  }
`;

export const SubscriptionsSubtitle = styled.p`
  margin: 5px 0 0;

  color: inherit;

  font-size: 14px;
  line-height: 1.4;

  opacity: 0.7;
`;

export const SubscriptionsStatusPanel = styled.div`
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

export const SubscriptionsStatusMessage = styled.p`
  max-width: 520px;

  margin: 0;

  overflow-wrap: anywhere;

  color: inherit;

  font-size: 15px;
  line-height: 1.5;

  opacity: 0.75;
`;
