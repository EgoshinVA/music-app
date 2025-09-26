export const CurrentUserReactionType = {
  Like: 1,
  Dislike: -1,
  None: 0,
} as const;

export type CurrentUserReaction = (typeof CurrentUserReactionType)[keyof typeof CurrentUserReactionType];

export enum ImageType {
  ORIGINAL = 'original',
  MEDIUM = 'medium',
  THUMBNAIL = 'thumbnail',
}
