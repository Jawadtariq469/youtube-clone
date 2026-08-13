import { useTheme } from '../../../store/global';

import { SidebarItemLabel, SidebarItemLink } from './sideBarItem.styles';

import type { SidebarItemProps } from './types';

const SidebarItem = ({
  icon,
  label,
  href,
  isActive = false,
  isExpanded = true,
  ...linkProps
}: SidebarItemProps) => {
  const { theme } = useTheme();

  return (
    <SidebarItemLink
      {...linkProps}
      to={href}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      title={!isExpanded ? label : undefined}
      $appTheme={theme}
      $isActive={isActive}
      $isExpanded={isExpanded}
    >
      {icon}

      <SidebarItemLabel $appTheme={theme} $isExpanded={isExpanded}>
        {label}
      </SidebarItemLabel>
    </SidebarItemLink>
  );
};

export default SidebarItem;
