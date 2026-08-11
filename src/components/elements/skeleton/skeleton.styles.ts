import styled, { keyframes } from 'styled-components';

import type { AppTheme } from '../../../theme';

interface SkeletonBlockProps {
  $appTheme: AppTheme;
  $width: string;
  $height: string;
  $borderRadius: string;
  $aspectRatio?: string;
}

const shimmerAnimation = keyframes`
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
`;

export const SkeletonBlock = styled.div<SkeletonBlockProps>`
  display: block;

  width: ${({ $width }) => $width};

  height: ${({ $height, $aspectRatio }) => ($aspectRatio ? 'auto' : $height)};

  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio ?? 'auto'};

  border-radius: ${({ $borderRadius }) => $borderRadius};

  background: linear-gradient(
    90deg,
    ${({ $appTheme }) => $appTheme.colors.background.secondary} 25%,
    ${({ $appTheme }) => $appTheme.colors.background.active} 50%,
    ${({ $appTheme }) => $appTheme.colors.background.secondary} 75%
  );

  background-size: 200% 100%;

  animation: ${shimmerAnimation} 1.5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
