import { FC } from 'react';

import s from './header.module.scss';

// const IS_AUTH = true; // temporary data

export const Header: FC = () => {
  return (
    <header className={s.header}>
      <div>music-app</div>

      {/* {IS_AUTH ? ( */}
      {/*  <ProfileDropdownMenu avatar="//unsplash.it/100/100" name="Martin Fowler" id="1" /> */}
      {/* ) : ( */}
      {/*  <LoginButtonAndModal /> */}
      {/* )} */}
    </header>
  );
};
