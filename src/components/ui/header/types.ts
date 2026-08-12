import type { AppTheme } from '../../../theme';

export interface HeaderProps {
  currentSearchValue?: string;

  onSearch: (searchValue: string) => void;

  onMenuClick?: () => void;

  onVoiceSearchClick?: () => void;

  onCreateClick?: () => void;

  onNotificationsClick?: () => void;
}

export interface HeaderThemeProps {
  $appTheme: AppTheme;
}
