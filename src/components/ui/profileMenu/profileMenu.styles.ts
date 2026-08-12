import styled from 'styled-components';

import type { ProfileMenuThemeProps } from './types';

export const ProfileMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ProfileDropdown = styled.div<ProfileMenuThemeProps>`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 20;
  width: min(280px, calc(100vw - 24px));
  overflow: hidden;
  border: 1px solid ${({ $appTheme }) => $appTheme.colors.input.border};
  border-radius: 12px;
  color: ${({ $appTheme }) => $appTheme.colors.text.primary};
  background-color: ${({ $appTheme }) => $appTheme.colors.background.page};
  box-shadow: 0 8px 28px rgb(0 0 0 / 18%);
`;

export const ProfileInformation = styled.div`
  padding: 16px;
`;

export const ProfileName = styled.p`
  margin: 0 0 4px;
  overflow: hidden;
  color: inherit;
  font-size: 15px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProfileEmail = styled.p`
  margin: 0;
  overflow: hidden;
  color: inherit;
  font-size: 13px;
  opacity: 0.7;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProfileMenuActions = styled.div<ProfileMenuThemeProps>`
  padding: 8px;
  border-top: 1px solid ${({ $appTheme }) => $appTheme.colors.input.border};
`;
