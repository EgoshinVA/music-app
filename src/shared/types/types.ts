import { ImageType } from '@/shared/enums';

export type Tag = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
};

export type Images = {
  main: Cover[];
};

export type Cover = {
  type: ImageType;
  width: number;
  height: number;
  fileSize: number;
  url: string;
};
