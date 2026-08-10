export const HtmlRole = {
  Search: 'search',
} as const;

export type THtmlRole = (typeof HtmlRole)[keyof typeof HtmlRole];
