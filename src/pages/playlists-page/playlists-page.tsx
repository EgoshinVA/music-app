import { FC } from 'react';

import s from './playlists-page.module.scss';

import { useFetchPlaylistsQuery } from '@/entities';
import { usePageSearchParams } from '@/features/playlists-page/hooks';
import { PlaylistCard } from '@/features/playlists-page/ui/playlist-card';
import defaultCover from '@/shared/assets/images/default-playlist-cover.png';
import { Pagination, SearchTags, SearchTextField, SortSelect, Typography } from '@/shared/ui';

export const PlaylistsPage: FC = () => {
  const { pageNumber, handlePageChange, debouncedSearch, sortBy, sortDirection, tagsIds } = usePageSearchParams();

  const { data: playlists } = useFetchPlaylistsQuery({
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
      <div className={s.playlists}>
        {playlists?.data.map(playlist => {
          const originalCover = playlist.attributes.images.main?.find(img => img.type === 'original');
          const src = originalCover ? originalCover?.url : defaultCover;

          return (
            <PlaylistCard
              key={playlist.id}
              id={playlist.id}
              title={playlist.attributes.title}
              image={src}
              description={playlist.attributes.description}
              isShowReactionButtons
              reaction={playlist.attributes.currentUserReaction}
              onLike={() => {}}
              onDislike={() => {}}
              likesCount={playlist.attributes.likesCount}
            />
          );
        })}
      </div>
      <Pagination className={s.pagination} page={pageNumber} pagesCount={pagesCount} onPageChange={handlePageChange} />
    </div>
  );
};
