import { baseApi } from '@/shared/api';
import { CurrentUserReaction } from '@/shared/enums';
import { Images, Tag, User } from '@/shared/types';

export type PlaylistAttributes = {
  title: string;
  description: string;
  addedAt: string;
  updatedAt: string;
  order: number;
  dislikesCount: number;
  likesCount: number;
  tags: Tag[];
  images: Images;
  user: User;
  currentUserReaction: CurrentUserReaction;
};

export type PlaylistData = {
  id: string;
  type: 'playlists';
  attributes: PlaylistAttributes;
};

export type PlaylistMeta = {
  page: number;
  pageSize: number;
  totalCount: number;
  pagesCount: number;
};

export type FetchPlaylistsArgs = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortBy?: 'addedAt' | 'likesCount';
  sortDirection?: 'asc' | 'desc';
  tagsIds?: string[];
  userId?: string;
  trackId?: string;
};

export type PlaylistsResponse = {
  data: PlaylistData[];
  meta: PlaylistMeta;
};

export type CreatePlaylistArgs = {
  title: string;
  description: string;
};

export type UpdatePlaylistArgs = {
  title: string;
  description: string;
  tagIds: string[];
};

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: params => ({ url: `playlists`, params }),
      providesTags: ['Playlist'],
    }),
    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: body => ({
        url: 'playlists',
        method: 'post',
        body,
      }),
      invalidatesTags: ['Playlist'],
    }),
    deletePlaylist: build.mutation<void, string>({
      query: playlistId => ({
        url: `playlists/${playlistId}`,
        method: 'delete',
      }),
      invalidatesTags: ['Playlist'],
    }),
    updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
      query: ({ playlistId, body }) => ({
        url: `playlists/${playlistId}`,
        method: 'put',
        body,
      }),
      invalidatesTags: ['Playlist'],
    }),
  }),
});

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistsApi;
