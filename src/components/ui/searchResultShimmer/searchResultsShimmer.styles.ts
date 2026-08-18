import styled from 'styled-components';

import { SearchResultsContainer } from '../searchResults/searchResults.styles';

export const ShimmerResults = styled(SearchResultsContainer)``;

export const ShimmerResultItem = styled.div`
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

  box-sizing: border-box;

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

export const ShimmerResultInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  min-width: 0;

  padding-top: 4px;

  @media (max-width: 700px) {
    padding: 10px 4px 0;
  }
`;

export const ShimmerChannelInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  margin-top: 8px;
`;

export const ShimmerDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-top: 4px;

  @media (max-width: 700px) {
    display: none;
  }
`;
