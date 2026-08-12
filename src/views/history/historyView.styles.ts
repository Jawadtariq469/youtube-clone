import styled from 'styled-components';

export const HistoryPage = styled.section`
  width: 100%;
`;

export const HistoryHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  margin-bottom: 24px;
`;

export const HistoryTitleGroup = styled.div`
  min-width: 0;
`;

export const HistoryTitle = styled.h1`
  margin: 0;

  color: inherit;

  font-size: 24px;
  font-weight: 600;
`;

export const HistorySubtitle = styled.p`
  margin: 5px 0 0;

  color: inherit;

  font-size: 14px;

  opacity: 0.7;
`;

export const HistoryGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr));

  gap: 32px 16px;

  width: 100%;
`;

export const HistoryVideoContainer = styled.article`
  min-width: 0;
`;

export const HistoryVideoFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 8px 10px 0;
`;

export const HistoryWatchedAt = styled.p`
  margin: 0;

  color: inherit;

  font-size: 12px;

  opacity: 0.65;
`;

export const HistoryStatusPanel = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;

  margin-top: 32px;
`;

export const HistoryStatusMessage = styled.p`
  margin: 0;

  color: inherit;

  font-size: 15px;
  line-height: 1.5;

  opacity: 0.75;
`;
