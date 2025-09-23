import { FC } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { CreatePlaylistArgs, useCreatePlaylistMutation } from '@/entities';

export const CreatePlaylistForm: FC = () => {
  const { register, handleSubmit, reset } = useForm<CreatePlaylistArgs>();

  const [createPlaylist] = useCreatePlaylistMutation();

  const onSubmit: SubmitHandler<CreatePlaylistArgs> = data => {
    createPlaylist(data).then(() => {
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register('title')} placeholder="title" />
      </div>
      <div>
        <input {...register('description')} placeholder="description" />
      </div>
      <button>create playlist</button>
    </form>
  );
};
