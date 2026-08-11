export type RecommendationFilter =
  | {
      id: string;
      label: string;
      kind: 'mixed';
    }
  | {
      id: string;
      label: string;
      kind: 'search';
      query: string;
    }
  | {
      id: string;
      label: string;
      kind: 'category';
      categoryId: string;
    }
  | {
      id: string;
      label: string;
      kind: 'trending';
    };
