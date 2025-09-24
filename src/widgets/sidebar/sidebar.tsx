import { FC } from 'react';

import s from './sidebar.module.scss';

import { MenuLinks } from '@/widgets/sidebar/menu-links';

export const Sidebar: FC = () => {
  return (
    <div className={s.sidebar}>
      <MenuLinks />
    </div>
  );
};
