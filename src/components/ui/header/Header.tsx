import { useState } from 'react';

import { useDebouncedValue } from '../../../hooks/useDebouncedValue';
import { useSearchSuggestions } from '../../../hooks/useSearchSuggestions';
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

const SEARCH_SUGGESTION_DEBOUNCE_MS = 300;

const Header = ({
  userName,
  userAvatarUrl,
  currentSearchValue = AppConstants.EmptyString,
  onSearch,
  onMenuClick,
  onVoiceSearchClick,
  onCreateClick,
  onNotificationsClick,
  onProfileClick,
}: HeaderProps) => {
  const [draftSearchValue, setDraftSearchValue] = useState<string | null>(null);

  const searchValue = draftSearchValue ?? currentSearchValue;

  const debouncedSearchValue = useDebouncedValue(
    searchValue,
    SEARCH_SUGGESTION_DEBOUNCE_MS,
  );

  const { data: searchSuggestions = [], isFetching: isSuggestionsLoading } =
    useSearchSuggestions(debouncedSearchValue);

  const { theme } = useTheme();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDraftSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const normalizedSearchValue = searchValue.trim();

    if (!normalizedSearchValue) {
      return;
    }

    onSearch(normalizedSearchValue);
    setDraftSearchValue(null);
  };

  const handleSuggestionSelect = (suggestion: string): void => {
    onSearch(suggestion);
    setDraftSearchValue(null);
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
          suggestions={searchSuggestions}
          isSuggestionsLoading={isSuggestionsLoading}
          onSuggestionSelect={handleSuggestionSelect}
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
