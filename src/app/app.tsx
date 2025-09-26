import { FC } from 'react';

import clsx from 'clsx';
import { Outlet } from 'react-router';

import s from './app.module.scss';

import { selectIsCreateEditModalOpen } from '@/features/playlists-page/model';
import { CreatePlaylistModal } from '@/features/playlists-page/ui';
import { useAppSelector } from '@/shared/lib';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';

export const App: FC = () => {
  const IS_PLAYER_OPEN = true;
  const isCreatePlaylistModalOpen = useAppSelector(selectIsCreateEditModalOpen);

  return (
    <div className={clsx(s.grid, IS_PLAYER_OPEN && s.playerOpen)}>
      <Header />
      <Sidebar />
      <main className={s.main}>
        <Outlet />
      </main>
      {/* {IS_PLAYER_OPEN && <Player />} */}
      {isCreatePlaylistModalOpen && <CreatePlaylistModal />}
    </div>
  );
};
