import { useTheme } from '../../../store/global';

import {
  CategoryBarContainer,
  CategoryButton,
  CategoryList,
} from './categoryBar.styles';

import type { CategoryBarProps } from './types';

const CategoryBar = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryBarProps) => {
  const { theme } = useTheme();

  return (
    <CategoryBarContainer $appTheme={theme} aria-label="Video categories">
      <CategoryList>
        {categories.map((category) => {
          const isActive = category.id === selectedCategory;

          return (
            <CategoryButton
              key={category.id}
              type="button"
              $appTheme={theme}
              $isActive={isActive}
              aria-pressed={isActive}
              onClick={() => onSelect(category.id)}
            >
              {category.label}
            </CategoryButton>
          );
        })}
      </CategoryList>
    </CategoryBarContainer>
  );
};

export default CategoryBar;
