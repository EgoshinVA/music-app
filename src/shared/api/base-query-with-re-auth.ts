import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { authApi } from '@/entities/auth';
import { baseQuery } from '@/shared/api/base-query';
import { AUTH_KEYS, handleErrors, isTokens } from '@/shared/lib';

const mutex = new Mutex();

export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshToken = localStorage.getItem(AUTH_KEYS.refreshToken);

        const refreshResult = await baseQuery(
          { url: 'auth/refresh', method: 'post', body: { refreshToken } },
          api,
          extraOptions,
        );

        if (refreshResult.data && isTokens(refreshResult.data)) {
          localStorage.setItem(AUTH_KEYS.accessToken, refreshResult.data.accessToken);
          localStorage.setItem(AUTH_KEYS.refreshToken, refreshResult.data.refreshToken);
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(authApi.endpoints.logout.initiate());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  if (result.error && result.error.status !== 401) {
    handleErrors(result.error);
  }

  return result;
};
