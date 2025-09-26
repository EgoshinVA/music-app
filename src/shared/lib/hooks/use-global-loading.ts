import { useSelector } from 'react-redux';

import { RootState } from '@/app/store/store';

export const useGlobalLoading = (): boolean => {
  return useSelector((state: RootState) => {
    const queries = Object.values(state.baseApi.queries || {});
    const mutations = Object.values(state.baseApi.mutations || {});

    const hasActiveQueries = queries.some(query => query?.status === 'pending');
    const hasActiveMutations = mutations.some(mutation => mutation?.status === 'pending');

    return hasActiveQueries || hasActiveMutations;
  });
};
