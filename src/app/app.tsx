import { FC } from 'react';

import clsx from 'clsx';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

import s from './app.module.scss';

import { selectIsCreateEditModalOpen } from '@/features/playlists-page/model';
import { CreateEditPlaylistModal } from '@/features/playlists-page/ui';
import { useAppSelector, useGlobalLoading } from '@/shared/lib';
import { LinearProgress } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';

export const App: FC = () => {
  const IS_PLAYER_OPEN = true;
  const isCreatePlaylistModalOpen = useAppSelector(selectIsCreateEditModalOpen);
  const isGlobalLoading = useGlobalLoading();

  return (
    <div className={clsx(s.grid, IS_PLAYER_OPEN && s.playerOpen)}>
      <Header />
      {isGlobalLoading && <LinearProgress />}
      <Sidebar />
      <main className={s.main}>
        <Outlet />
      </main>
      {/* {IS_PLAYER_OPEN && <Player />} */}
      {isCreatePlaylistModalOpen && <CreateEditPlaylistModal />}
      <ToastContainer />
    </div>
  );
};
