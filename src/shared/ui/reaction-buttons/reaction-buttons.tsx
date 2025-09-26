import { FC } from 'react';

import { clsx } from 'clsx';

import s from './reaction-buttons.module.scss';

import { DislikeIcon, LikeIcon, LikeIconFill } from '@/shared/assets';
import { CurrentUserReaction, CurrentUserReactionType } from '@/shared/enums';
import { IconButton } from '@/shared/ui';

export type ReactionButtonsProps = {
  reaction: CurrentUserReaction;
  onLike: () => void;
  onDislike: () => void;
  likesCount?: number;
  className?: string;
  size?: keyof typeof SIZE_MAP;
};

const SIZE_MAP = {
  small: 28,
  large: 40,
};

export const ReactionButtons: FC<ReactionButtonsProps> = ({
  reaction = CurrentUserReactionType.None,
  onLike,
  onDislike,
  likesCount,
  className,
  size = 'small',
}) => {
  const isLiked = reaction === CurrentUserReactionType.Like;
  const isDisliked = reaction === CurrentUserReactionType.Dislike;

  const iconSize = SIZE_MAP[size];

  return (
    <div className={clsx(s.container, className)}>
      <div className={s.likesCountBox}>
        <IconButton
          onClick={e => {
            e.preventDefault();
            onLike();
          }}
          className={clsx(s.button, isLiked && s.liked, size === 'large' && s.large)}
          aria-label={isLiked ? 'Remove like' : 'Like'}
          type="button"
        >
          {isLiked ? (
            <LikeIconFill width={iconSize} height={iconSize} />
          ) : (
            <LikeIcon width={iconSize} height={iconSize} />
          )}
        </IconButton>
        <span className={s.likesCount}>{likesCount}</span>
      </div>

      <IconButton
        onClick={e => {
          e.preventDefault();
          onDislike();
        }}
        className={clsx(s.button, isDisliked && s.disliked, size === 'large' && s.large)}
        aria-label={isDisliked ? 'Remove dislike' : 'Dislike'}
        type="button"
      >
        <DislikeIcon width={iconSize} height={iconSize} />
      </IconButton>
    </div>
  );
};
