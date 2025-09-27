import { FC } from 'react';

import s from './playlist-list.module.scss';

import { PlaylistData } from '@/entities';
import { PlaylistCard } from '@/features/playlists-page/ui';
import defaultCover from '@/shared/assets/images/default-playlist-cover.png';

type Props = {
  playlists: PlaylistData[];
  isPlaylistsLoading: boolean;
};

export const PlaylistList: FC<Props> = ({ playlists, isPlaylistsLoading }) => {
  return (
    <div className={s.playlists}>
      {playlists?.map(playlist => {
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
  );
};
