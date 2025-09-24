import { FC } from 'react';

import { PlaylistData } from '@/entities';

type Props = {
  playlist: PlaylistData;
  deletePlaylist: (playlistId: string) => void;
  editPlaylist: (playlist: PlaylistData) => void;
};

export const PlaylistItem: FC<Props> = ({ playlist, editPlaylist, deletePlaylist }) => {
  return (
    <div>
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylist(playlist.id)} type="button">
        delete
      </button>
      <button onClick={() => editPlaylist(playlist)} type="button">
        update
      </button>
    </div>
  );
};
