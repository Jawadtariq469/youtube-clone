import styled from 'styled-components';

export const SearchResultsContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;

  width: 100%;
  max-width: 1200px;

  padding-top: 8px;

  box-sizing: border-box;

  @media (max-width: 700px) {
    gap: 28px;

    padding-top: 4px;
  }
`;
