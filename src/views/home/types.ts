export interface HomeViewProps {
  onVideoSelect: (videoId: string) => void;
}

export type CategoryOption = {
  id: string;
  label: string;
};
