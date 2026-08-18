import styled from 'styled-components';

export const GridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
  gap: 48px 16px;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const EmptyMessage = styled.p`
  grid-column: 1 / -1;
  margin: 40px 0;
  color: inherit;
  font-size: 16px;
  text-align: center;
  opacity: 0.7;
`;
