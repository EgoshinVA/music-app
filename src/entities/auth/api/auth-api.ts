import { baseApi } from '@/shared/api';
import { AUTH_KEYS } from '@/shared/lib';

export type MeResponse = {
  userId: string;
  login: string;
};

export type LoginResponse = {
  refreshToken: string;
  accessToken: string;
};

export type LoginArgs = {
  code: string;
  redirectUri: string;
  rememberMe: boolean;
  accessTokenTTL?: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMe: build.query<MeResponse, void>({
      query: () => `auth/me`,
      providesTags: ['Auth'],
    }),
    login: build.mutation<LoginResponse, LoginArgs>({
      query: payload => ({
        url: `auth/login`,
        method: 'post',
        body: { ...payload, accessTokenTTL: '3m' },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        localStorage.setItem(AUTH_KEYS.accessToken, data.accessToken);
        localStorage.setItem(AUTH_KEYS.refreshToken, data.refreshToken);
        dispatch(authApi.util.invalidateTags(['Auth']));
      },
    }),
    logout: build.mutation<void, void>({
      query: () => {
        const refreshToken = localStorage.getItem(AUTH_KEYS.refreshToken);

        return { url: 'auth/logout', method: 'post', body: { refreshToken } };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        await queryFulfilled;
        localStorage.removeItem(AUTH_KEYS.accessToken);
        localStorage.removeItem(AUTH_KEYS.refreshToken);
        dispatch(baseApi.util.resetApiState());
      },
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi;
