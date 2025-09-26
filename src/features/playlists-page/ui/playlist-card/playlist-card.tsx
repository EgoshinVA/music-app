import { FC } from 'react';

import { Link } from 'react-router';

import s from './playlist-card.module.scss';

import { Card, ReactionButtons, ReactionButtonsProps, Typography } from '@/shared/ui';

type PlaylistCardPropsBase = {
  id: string;
  title: string;
  image: string | undefined;
  description: string;
};

type PlaylistCardPropsWithReactions = PlaylistCardPropsBase & {
  isShowReactionButtons: true;
} & Omit<ReactionButtonsProps, 'className'>;

type PlaylistCardPropsWithoutReactions = PlaylistCardPropsBase & {
  isShowReactionButtons?: false;
};

type PlaylistCardProps = PlaylistCardPropsWithReactions | PlaylistCardPropsWithoutReactions;

export const PlaylistCard: FC<PlaylistCardProps> = ({
  title,
  image,
  description,
  id,
  isShowReactionButtons,
  ...props
}) => {
  return (
    <Card as={Link} to={`/playlists/${id}`} className={s.card}>
      <div className={s.image}>
        <img src={image} alt="" aria-hidden />
      </div>
      <Typography variant="h3" className={s.title}>
        {title}
      </Typography>
      <Typography variant="body3" className={s.description}>
        {description}
      </Typography>
      {isShowReactionButtons && 'reaction' in props && (
        <ReactionButtons
          reaction={props.reaction}
          onLike={props.onLike}
          onDislike={props.onDislike}
          likesCount={props.likesCount}
        />
      )}
    </Card>
  );
};
