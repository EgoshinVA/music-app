import { ImageType } from '@/shared/enums';
import { Cover, Images } from '@/shared/types';

export const getImageByType = (images: Images, type: ImageType): Cover | undefined => {
  return images.main.find(image => image.type === type);
};
