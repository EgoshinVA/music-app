import { FC } from 'react';

import s from './playlists-page.module.scss';

import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from '@/entities';
import { CreatePlaylistForm } from '@/features/playlists-page/ui';

export const PlaylistsPage: FC = () => {
  const { data } = useFetchPlaylistsQuery({});
  const [deletePlaylist] = useDeletePlaylistMutation();

  const deletePlaylistHandler = (playlistId: string): void => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId);
    }
  };

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map(playlist => {
          return (
            <div className={s.item} key={playlist.id}>
              <div>title: {playlist.attributes.title}</div>
              <div>description: {playlist.attributes.description}</div>
              <div>userName: {playlist.attributes.user.name}</div>
              <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
