import { FC, useState } from 'react';

import { useForm } from 'react-hook-form';

import s from './playlists-page.module.scss';

import { PlaylistData, UpdatePlaylistArgs, useDeletePlaylistMutation, useFetchPlaylistsQuery } from '@/entities';
import { CreatePlaylistForm, EditPlaylistForm, PlaylistItem } from '@/features/playlists-page/ui';

export const PlaylistsPage: FC = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const { data } = useFetchPlaylistsQuery({});

  const [deletePlaylist] = useDeletePlaylistMutation();

  const deletePlaylistHandler = (playlistId: string): void => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylist(playlistId);
    }
  };

  const editPlaylistHandler = (playlist: PlaylistData | null): void => {
    if (playlist) {
      setPlaylistId(playlist.id);
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map(t => t.id),
      });
    } else {
      setPlaylistId(null);
    }
  };

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map(playlist => {
          const isEditing = playlistId === playlist.id;

          return (
            <div className={s.item} key={playlist.id}>
              {isEditing ? (
                <EditPlaylistForm
                  editPlaylist={editPlaylistHandler}
                  setPlaylistId={setPlaylistId}
                  playlistId={playlistId}
                  handleSubmit={handleSubmit}
                  register={register}
                />
              ) : (
                <PlaylistItem
                  playlist={playlist}
                  deletePlaylist={deletePlaylistHandler}
                  editPlaylist={editPlaylistHandler}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
