import { useState } from 'react';

import { Avatar, Button, IconButton } from '../../elements';
import {
  CreateIcon,
  MenuIcon,
  MicrophoneIcon,
  NotificationIcon,
  YouTubeIcon,
} from '../../icons';
import { AppConstants, AppRoutes, AppText } from '../../../constants';
import { useTheme } from '../../../store/global';
import {
  AvatarSize,
  ButtonSize,
  ButtonVariant,
  IconButtonSize,
} from '../../../utils/enums';

import SearchBar from '../searchBar/SearchBar';

import {
  BrandIcon,
  BrandLink,
  BrandText,
  CreateAction,
  HeaderCenter,
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  VoiceSearchAction,
} from './header.styles';

import type { ChangeEvent, FormEvent } from 'react';
import type { HeaderProps } from './types';

const Header = ({
  userName,
  userAvatarUrl,
  onSearch,
  onMenuClick,
  onVoiceSearchClick,
  onCreateClick,
  onNotificationsClick,
  onProfileClick,
}: HeaderProps) => {
  const [searchValue, setSearchValue] = useState<string>(
    AppConstants.EmptyString,
  );

  const { theme } = useTheme();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedSearchValue = searchValue.trim();

    if (!normalizedSearchValue) {
      return;
    }

    onSearch(normalizedSearchValue);
  };

  return (
    <HeaderContainer $appTheme={theme}>
      <HeaderLeft $appTheme={theme}>
        <IconButton
          icon={<MenuIcon />}
          label={AppText.Header.OpenMenu}
          size={IconButtonSize.Medium}
          onClick={onMenuClick}
        />

        <BrandLink
          href={AppRoutes.Home}
          aria-label={AppText.Header.YouTubeHome}
          $appTheme={theme}
        >
          <BrandIcon $appTheme={theme}>
            <YouTubeIcon />
          </BrandIcon>

          <BrandText $appTheme={theme}>{AppText.Brand.Name}</BrandText>
        </BrandLink>
      </HeaderLeft>

      <HeaderCenter $appTheme={theme}>
        <SearchBar
          value={searchValue}
          placeholder={AppText.Header.SearchPlaceholder}
          inputLabel={AppText.Header.SearchInputLabel}
          buttonLabel={AppText.Header.SearchButtonLabel}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />

        <VoiceSearchAction $appTheme={theme}>
          <IconButton
            icon={<MicrophoneIcon />}
            label={AppText.Header.VoiceSearch}
            size={IconButtonSize.Medium}
            onClick={onVoiceSearchClick}
          />
        </VoiceSearchAction>
      </HeaderCenter>

      <HeaderRight $appTheme={theme}>
        <CreateAction $appTheme={theme}>
          <Button
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Small}
            onClick={onCreateClick}
          >
            <CreateIcon />

            {AppText.Header.Create}
          </Button>
        </CreateAction>

        <IconButton
          icon={<NotificationIcon />}
          label={AppText.Header.Notifications}
          size={IconButtonSize.Medium}
          onClick={onNotificationsClick}
        />

        <Avatar
          name={userName}
          src={userAvatarUrl}
          label={AppText.Header.UserProfile}
          size={AvatarSize.Small}
          onClick={onProfileClick}
        />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
