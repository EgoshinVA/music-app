import type { ComponentProps, FC, KeyboardEvent } from 'react';
import { useState } from 'react';

import { clsx } from 'clsx';

import s from './tag-editor.module.scss';

import { DeleteIcon } from '@/shared/assets';
import { IconButton, TextField, Typography } from '@/shared/ui';

export type TagEditorProps = {
  label?: string;
  placeholder?: string;
  value: string[];
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
  disabled?: boolean;
} & ComponentProps<'div'>;

export const TagEditor: FC<TagEditorProps> = ({
  label,
  placeholder = 'Add tag and press Enter',
  value,
  onTagsChange,
  className,
  maxTags,
  disabled = false,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string): void => {
    const trimmedTag = tag.trim();

    if (!trimmedTag) return;
    if (value.includes(trimmedTag)) return;
    if (maxTags && value.length >= maxTags) return;

    onTagsChange([...value, trimmedTag]);
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    }

    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const isMaxTagsReached = maxTags ? value.length >= maxTags : false;

  return (
    <div className={clsx(s.container, className)} {...props}>
      <TextField
        label={label}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isMaxTagsReached ? 'Max tags reached' : placeholder}
        disabled={disabled}
      />

      {value.length > 0 && (
        <ul className={s.tagsContainer}>
          {value.map(tag => (
            <li key={tag} className={s.tag}>
              <Typography variant="body2" className={s.tagText}>
                {tag}
              </Typography>
              <IconButton
                onClick={() => removeTag(tag)}
                className={s.deleteButton}
                disabled={disabled}
                aria-label={`Remove tag ${tag}`}
                type="button"
              >
                <DeleteIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      )}

      {maxTags && (
        <Typography variant="caption" className={s.counter}>
          {value.length}/{maxTags} tags
        </Typography>
      )}
    </div>
  );
};
