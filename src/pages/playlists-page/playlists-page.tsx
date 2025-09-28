import { FC } from 'react';

import s from './playlists-page.module.scss';

import { useFetchPlaylistsQuery } from '@/entities';
import { usePageSearchParams } from '@/features/playlists-page/hooks';
import { PlaylistList } from '@/features/playlists-page/ui';
import { Pagination, SearchTags, SearchTextField, SortSelect, Typography } from '@/shared/ui';

export const PlaylistsPage: FC = () => {
  const { pageNumber, handlePageChange, debouncedSearch, sortBy, sortDirection, tagsIds } = usePageSearchParams();

  const { data: playlists, isLoading } = useFetchPlaylistsQuery({
    pageNumber,
    search: debouncedSearch,
    ...(sortBy && { sortBy }),
    ...(sortDirection && { sortDirection }),
    ...(tagsIds.length > 0 && { tagsIds }),
    pageSize: 15,
  });
  const pagesCount = playlists?.meta.pagesCount || 1;

  return (
    <div>
      <Typography variant="h2" as="h1" className={s.title}>
        All Playlists
      </Typography>
      <div className={s.controls}>
        <div className={s.controlsRow}>
          <SearchTextField />
          <SortSelect />
        </div>
        <SearchTags type="tags" className={s.searchTags} />
      </div>
      <PlaylistList playlists={playlists?.data || []} isPlaylistsLoading={isLoading} />
      <Pagination className={s.pagination} page={pageNumber} pagesCount={pagesCount} onPageChange={handlePageChange} />
    </div>
  );
};
