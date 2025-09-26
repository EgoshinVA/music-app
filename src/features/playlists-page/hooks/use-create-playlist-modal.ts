import { useCallback } from 'react';

import { openCreateModal, selectIsCreateEditModalOpen } from '@/features/playlists-page/model/playlists-slice';
import { useAppDispatch, useAppSelector } from '@/shared/lib';

export const useCreatePlaylistModal = () => {
  const dispatch = useAppDispatch();
  const isCreatePlaylistModalOpen = useAppSelector(selectIsCreateEditModalOpen);

  const handleOpenCreatePlaylistModal = useCallback(() => {
    dispatch(openCreateModal());
  }, [dispatch]);

  return {
    isCreatePlaylistModalOpen,
    handleOpenCreatePlaylistModal,
  };
};
