import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlist', 'Tag'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: headers => {
      headers.set('API-KEY', import.meta.env.VITE_API_KEY);
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});
