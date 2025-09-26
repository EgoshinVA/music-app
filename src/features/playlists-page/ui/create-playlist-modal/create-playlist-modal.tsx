import { FC, useState } from 'react';

import s from './create-playlist-modal.module.scss';

import { closeCreateEditModal } from '@/features/playlists-page/model';
import { useAppDispatch } from '@/shared/lib';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  ImageUploader,
  TagEditor,
  Textarea,
  TextField,
  Typography,
} from '@/shared/ui';

export const CreatePlaylistModal: FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const handleTagsChange = (tags: string[]): void => {
    setTags(tags);
  };

  const dispatch = useAppDispatch();

  const onClose = (): void => {
    dispatch(closeCreateEditModal());
  };

  return (
    <Dialog open onClose={onClose} className={s.dialog}>
      <DialogHeader>
        <Typography variant="h2">Create Playlist</Typography>
      </DialogHeader>

      <form className={s.form}>
        <DialogContent className={s.content}>
          <ImageUploader className={s.imageUploader} onImageSelect={() => {}} />
          <TextField label="Title" placeholder="Enter playlist title" />
          <Textarea rows={3} label="Description" placeholder="Enter playlist description" />
          <TagEditor label="Hashtags" value={tags} onTagsChange={handleTagsChange} maxTags={5} />
        </DialogContent>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};
