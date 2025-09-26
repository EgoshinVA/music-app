import { baseApi } from '@/shared/api';

export type MeResponse = {
  userId: string;
  login: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMe: build.query<MeResponse, void>({
      query: () => `auth/me`,
    }),
  }),
});

export const { useGetMeQuery } = authApi;
