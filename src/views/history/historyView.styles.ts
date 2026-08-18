import styled from 'styled-components';

export const HistoryPage = styled.section`
  width: 100%;
  max-width: 1600px;
  min-width: 0;

  margin: 0 auto;
`;

export const HistoryHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  margin-bottom: 24px;

  @media (max-width: 600px) {
    align-items: stretch;
    flex-direction: column;
    gap: 14px;

    margin-bottom: 20px;
  }
`;

export const HistoryTitleGroup = styled.div`
  flex: 1;
  min-width: 0;
`;

export const HistoryTitle = styled.h1`
  margin: 0;

  color: inherit;

  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;

  @media (max-width: 600px) {
    font-size: 21px;
  }
`;

export const HistorySubtitle = styled.p`
  margin: 5px 0 0;

  color: inherit;

  font-size: 14px;
  line-height: 1.4;

  opacity: 0.7;
`;

export const HistoryHeaderAction = styled.div`
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 100%;

    & > button {
      width: 100%;
    }
  }
`;

export const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  align-items: stretch;
  gap: 28px 16px;

  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px 14px;
  }

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
  }
`;

export const HistoryVideoContainer = styled.article`
  display: flex;
  flex-direction: column;

  min-width: 0;
  height: 100%;
`;

export const HistoryVideoFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  min-width: 0;

  padding: 8px 10px 0;

  @media (max-width: 420px) {
    gap: 8px;

    padding-inline: 4px;
  }
`;

export const HistoryWatchedAt = styled.p`
  flex: 1;
  min-width: 0;

  margin: 0;

  overflow-wrap: anywhere;

  color: inherit;

  font-size: 12px;
  line-height: 1.4;

  opacity: 0.65;
`;

export const HistoryStatusPanel = styled.div`
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

export const HistoryStatusMessage = styled.p`
  max-width: 520px;

  margin: 0;

  overflow-wrap: anywhere;

  color: inherit;

  font-size: 15px;
  line-height: 1.5;

  opacity: 0.75;
`;
