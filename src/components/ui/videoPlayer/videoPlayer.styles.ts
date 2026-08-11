import styled from 'styled-components';

export const PlayerContainer = styled.div`
  position: relative;

  width: 100%;
  aspect-ratio: 16 / 9;

  overflow: hidden;

  border-radius: 12px;

  background-color: #000000;
`;

export const PlayerFrame = styled.iframe`
  display: block;

  width: 100%;
  height: 100%;

  border: none;
`;
