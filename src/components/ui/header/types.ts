import type { AppTheme } from '../../../theme';

export interface HeaderProps {
  userName: string;
  userAvatarUrl?: string;

  onSearch: (searchValue: string) => void;

  onMenuClick?: () => void;
  onVoiceSearchClick?: () => void;
  onCreateClick?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
}

export interface HeaderThemeProps {
  $appTheme: AppTheme;
}
