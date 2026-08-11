export type CategoryOption = {
  id: string;
  label: string;
};

export type CategoryBarProps = {
  categories: readonly CategoryOption[];
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
};
