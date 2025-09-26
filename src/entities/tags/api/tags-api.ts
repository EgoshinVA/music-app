import { baseApi } from '@/shared/api';
import { Tag } from '@/shared/types';

export const tagsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    findTags: build.query<Tag[], { value: string }>({
      query: ({ value }) => `/tags/search?search=${value}`,
      providesTags: ['Tag'],
    }),
    createTag: build.mutation<void, { name: string }>({
      query: body => ({ url: '/tags', method: 'POST', body }),
      invalidatesTags: ['Tag'],
    }),
    removeTag: build.mutation<Tag, { id: string }>({
      query: body => ({ url: `/tags/${body.id}`, method: 'DELETE', body }),
      invalidatesTags: ['Tag'],
    }),
  }),
});

export const { useFindTagsQuery, useCreateTagMutation, useRemoveTagMutation } = tagsApi;
