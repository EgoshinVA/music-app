import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`);

      return headers;
    },
  }),
  endpoints: build => ({
    fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: () => ({
        method: 'get',
        url: `playlists`,
      }),
    }),
    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: body => ({
        url: 'playlists',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation } = playlistsApi;
