import { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { NavLink } from 'react-router';

import s from './menu-links.module.scss';

import { CreateIcon, HomeIcon, LibraryIcon, PlaylistIcon, TrackIcon, UploadIcon } from '@/shared/assets';

type MenuLink = {
  to: string;
  icon: ReactNode;
  label: string;
};

type MenuButton = {
  onClick: () => void;
  icon: ReactNode;
  label: string;
};

const mainLinks: MenuLink[] = [
  {
    to: '/',
    icon: <HomeIcon width={32} height={32} />,
    label: 'Home',
  },
  {
    to: '/user/1',
    icon: <LibraryIcon />,
    label: 'Your Library',
  },
];

const createLinks: MenuLink[] = [
  {
    to: '/tracks',
    icon: <TrackIcon />,
    label: 'All Tracks',
  },
  {
    to: '/playlists',
    icon: <PlaylistIcon />,
    label: 'All Playlists',
  },
];

export const MenuLinks: FC = () => {
  const actionButtons: MenuButton[] = [
    {
      onClick: () => {},
      icon: <CreateIcon />,
      label: 'Create Playlist',
    },
    {
      onClick: () => {},
      icon: <UploadIcon />,
      label: 'Upload Track',
    },
  ];

  return (
    <nav className={s.column} aria-label="Main navigation">
      <ul className={s.list}>
        {mainLinks.map(el => (
          <li key={el.to}>
            <SidebarLink {...el} />
          </li>
        ))}
      </ul>
      <ul className={s.list}>
        {actionButtons.map(el => (
          <li key={el.label}>
            <SidebarButton {...el} />
          </li>
        ))}
      </ul>
      <ul className={s.list}>
        {createLinks.map(el => (
          <li key={el.to}>
            <SidebarLink {...el} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

const SidebarLink = ({ to, icon, label }: MenuLink) => (
  <NavLink to={to} className={({ isActive }) => clsx(s.link, isActive && s.active)}>
    {icon}
    {label}
  </NavLink>
);

const SidebarButton = ({ onClick, icon, label }: MenuButton) => (
  <button onClick={onClick} className={s.link} type="button">
    {icon}
    {label}
  </button>
);
