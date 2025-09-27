import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReAuth } from '@/shared/api/base-query-with-re-auth';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlist', 'Tag', 'Auth'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
