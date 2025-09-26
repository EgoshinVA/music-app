import { FC } from 'react';

import s from './header.module.scss';

import { useGetMeQuery } from '@/entities/auth';
import { setIsAuthModalOpen } from '@/features/auth/model';
import { ProfileDropdownMenu } from '@/features/auth/ui/profile-dropdown-menu';
import { useAppDispatch } from '@/shared/lib';
import { Button } from '@/shared/ui';

export const Header: FC = () => {
  const { data: user, isLoading } = useGetMeQuery();
  const dispatch = useAppDispatch();
  const isAuth = !!user;

  return (
    <header className={s.header}>
      <div className={s.logo}>Music-app</div>

      {isAuth ? (
        <ProfileDropdownMenu avatar="//unsplash.it/100/100" name={user.login} id={user.userId} />
      ) : isLoading ? null : (
        <Button onClick={() => dispatch(setIsAuthModalOpen({ isAuthModalOpen: true }))}>Sign in</Button>
      )}
    </header>
  );
};
