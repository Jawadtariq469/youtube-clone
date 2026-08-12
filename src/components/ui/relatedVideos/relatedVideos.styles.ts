import styled from 'styled-components';

import type { AppTheme } from '../../../theme';

interface RelatedVideoButtonProps {
  $appTheme: AppTheme;
}

interface RecommendationFilterButtonProps {
  $appTheme: AppTheme;
  $isSelected: boolean;
}

export const RelatedVideosSection = styled.aside`
  width: 100%;
  min-width: 0;
`;

export const RelatedVideosHeading = styled.h2`
  margin: 0 0 12px;

  color: inherit;

  font-size: 18px;
  font-weight: 600;
`;

export const RelatedVideosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RelatedVideoButton = styled.button<RelatedVideoButtonProps>`
  display: grid;
  grid-template-columns: 168px minmax(0, 1fr);
  align-items: start;
  gap: 8px;

  width: 100%;

  padding: 4px;

  border: none;
  border-radius: 10px;

  color: inherit;

  background-color: transparent;

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  text-align: left;

  cursor: pointer;

  &:hover {
    background-color: ${({ $appTheme }) => $appTheme.colors.background.active};
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.text.primary};

    outline-offset: 2px;
  }

  @media (max-width: 460px) {
    grid-template-columns: 145px minmax(0, 1fr);
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;

  width: 100%;
  aspect-ratio: 16 / 9;

  overflow: hidden;

  border-radius: 8px;

  background-color: rgb(128 128 128 / 20%);
`;

export const Thumbnail = styled.img`
  display: block;

  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const Duration = styled.span`
  position: absolute;
  right: 4px;
  bottom: 4px;

  padding: 2px 4px;

  border-radius: 3px;

  color: #ffffff;
  background-color: rgb(0 0 0 / 80%);

  font-size: 11px;
  font-weight: 600;
`;

export const RelatedVideoDetails = styled.div`
  min-width: 0;
`;

export const RelatedVideoTitle = styled.h3`
  display: -webkit-box;

  margin: 0 0 6px;

  overflow: hidden;

  color: inherit;

  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const RelatedChannelTitle = styled.p`
  margin: 0 0 2px;

  overflow: hidden;

  color: inherit;

  font-size: 12px;

  opacity: 0.7;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RelatedMetadata = styled.p`
  margin: 0;

  color: inherit;

  font-size: 12px;
  line-height: 1.4;

  opacity: 0.7;
`;

export const RelatedStatusMessage = styled.p`
  margin: 16px 0;

  color: inherit;

  font-size: 14px;

  opacity: 0.75;
`;

export const RelatedSkeletonItem = styled.div`
  display: grid;
  grid-template-columns: 168px minmax(0, 1fr);
  gap: 8px;

  padding: 4px;

  @media (max-width: 460px) {
    grid-template-columns: 145px minmax(0, 1fr);
  }
`;

export const RelatedSkeletonDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-top: 2px;
`;
export const RecommendationFiltersContainer = styled.div`
  display: flex;
  gap: 8px;

  width: 100%;

  margin-bottom: 12px;
  padding-bottom: 2px;

  overflow-x: auto;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RecommendationFilterButton = styled.button<RecommendationFilterButtonProps>`
  flex-shrink: 0;

  padding: 8px 12px;

  border: none;
  border-radius: 8px;

  color: ${({ $appTheme, $isSelected }) =>
    $isSelected
      ? $appTheme.colors.background.page
      : $appTheme.colors.text.primary};

  background-color: ${({ $appTheme, $isSelected }) =>
    $isSelected
      ? $appTheme.colors.text.primary
      : $appTheme.colors.background.secondary};

  font-family: ${({ $appTheme }) => $appTheme.font.family.primary};
  font-size: 13px;
  font-weight: 600;

  white-space: nowrap;

  cursor: pointer;

  transition:
    opacity 150ms ease,
    background-color 150ms ease;

  &:hover {
    opacity: 0.82;
  }

  &:focus-visible {
    outline: 2px solid ${({ $appTheme }) => $appTheme.colors.text.primary};

    outline-offset: 2px;
  }
`;
export const ThumbnailFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  padding: 12px;

  color: #ffffff;
  background: linear-gradient(135deg, #3a3a3a, #181818);

  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

export const ShowMoreContainer = styled.div`
  display: none;

  width: 100%;

  margin-top: 16px;

  @media (max-width: 768px) {
    display: block;
  }
`;
export const DesktopInfiniteScrollSentinel = styled.div`
  display: block;

  width: 100%;
  height: 1px;

  @media (max-width: 768px) {
    display: none;
  }
`;
