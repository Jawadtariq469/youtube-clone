import { useTheme } from '../../../store/global';

import {
  RecommendationFilterButton,
  RecommendationFiltersContainer,
} from './relatedVideos.styles';

import type { RecommendationFiltersProps } from './types';

const RecommendationFilters = ({
  filters,
  selectedFilterId,
  onFilterSelect,
}: RecommendationFiltersProps) => {
  const { theme } = useTheme();

  return (
    <RecommendationFiltersContainer
      role="toolbar"
      aria-label="Recommendation filters"
    >
      {filters.map((filter) => {
        const isSelected = filter.id === selectedFilterId;

        return (
          <RecommendationFilterButton
            key={filter.id}
            type="button"
            $appTheme={theme}
            $isSelected={isSelected}
            aria-pressed={isSelected}
            onClick={() => onFilterSelect(filter.id)}
          >
            {filter.label}
          </RecommendationFilterButton>
        );
      })}
    </RecommendationFiltersContainer>
  );
};

export default RecommendationFilters;
