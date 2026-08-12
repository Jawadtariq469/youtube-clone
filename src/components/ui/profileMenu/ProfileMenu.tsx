import { useEffect, useRef, useState } from 'react';
import { Avatar, Button } from '../../elements';
import { useAuth } from '../../../store/auth';
import { useTheme } from '../../../store/global';
import {
  AvatarSize,
  ButtonHtmlType,
  ButtonSize,
  ButtonVariant,
} from '../../../utils/enums';
import {
  ProfileDropdown,
  ProfileEmail,
  ProfileInformation,
  ProfileMenuActions,
  ProfileMenuContainer,
  ProfileName,
} from './profileMenu.styles';
const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const { user, isAuthenticated, isLoading, signInWithGoogle, signOut } =
    useAuth();
  const { theme } = useTheme();
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }
    const handleOutsideClick = (event: PointerEvent): void => {
      const clickedElement = event.target;

      if (
        clickedElement instanceof Node &&
        !menuContainerRef.current?.contains(clickedElement)
      ) {
        setIsMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);
  const handleSignIn = (): void => {
    void signInWithGoogle();
  };
  const handleSignOut = (): void => {
    setIsMenuOpen(false);
    void signOut();
  };

  const handleMenuToggle = (): void => {
    setIsMenuOpen((currentValue) => !currentValue);
  };
  if (!isAuthenticated || !user) {
    return (
      <ProfileMenuContainer>
        <Button
          type={ButtonHtmlType.Button}
          variant={ButtonVariant.Secondary}
          size={ButtonSize.Small}
          disabled={isLoading}
          onClick={handleSignIn}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </ProfileMenuContainer>
    );
  }

  return (
    <ProfileMenuContainer ref={menuContainerRef}>
      <Avatar
        name={user.name}
        label="Open profile menu"
        src={user.avatarUrl ?? undefined}
        size={AvatarSize.Small}
        disabled={isLoading}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        onClick={handleMenuToggle}
      />

      {isMenuOpen && (
        <ProfileDropdown
          $appTheme={theme}
          role="menu"
          aria-label="Profile menu"
        >
          <ProfileInformation>
            <ProfileName>{user.name}</ProfileName>

            {user.email && <ProfileEmail>{user.email}</ProfileEmail>}
          </ProfileInformation>

          <ProfileMenuActions $appTheme={theme}>
            <Button
              type={ButtonHtmlType.Button}
              role="menuitem"
              variant={ButtonVariant.Secondary}
              size={ButtonSize.Medium}
              isFullWidth
              disabled={isLoading}
              onClick={handleSignOut}
            >
              {isLoading ? 'Signing out...' : 'Sign out'}
            </Button>
          </ProfileMenuActions>
        </ProfileDropdown>
      )}
    </ProfileMenuContainer>
  );
};

export default ProfileMenu;
