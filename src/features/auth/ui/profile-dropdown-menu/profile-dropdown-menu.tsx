import { FC } from 'react';

import { Link } from 'react-router';

import s from './profile-dropdown-menu.module.scss';

import { useLogoutMutation } from '@/entities/auth';
import { LogoutIcon, ProfileIcon } from '@/shared/assets';
import { Path } from '@/shared/lib';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Typography } from '@/shared/ui';

export const ProfileDropdownMenu: FC<{ avatar: string; name: string; id: string }> = ({ avatar, name, id }) => {
  const [logout] = useLogoutMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={s.trigger}>
        <div className={s.avatar}>
          <img src={avatar} alt="" />
        </div>

        <Typography className={s.name} variant="body2">
          {name}
        </Typography>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem as={Link} to={`${Path.Profile}/${id}`}>
          <ProfileIcon />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>
          <LogoutIcon />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
