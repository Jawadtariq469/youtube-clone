import styled from 'styled-components';

import { GridContainer } from '../videoGrid/videoGrid.styles';

export const ShimmerGrid = styled(GridContainer)``;

export const ShimmerCard = styled.div`
  box-sizing: border-box;

  width: 100%;

  padding: 10px;
`;

export const ShimmerInformation = styled.div`
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 12px;

  padding-top: 12px;
`;

export const ShimmerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  min-width: 0;
`;
