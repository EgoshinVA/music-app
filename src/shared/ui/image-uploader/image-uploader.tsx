import { type ChangeEvent, type DragEvent, FC, useRef, useState, MouseEvent } from 'react';

import { clsx } from 'clsx';

import s from './image-uploader.module.scss';

import { ImageUploadIcon } from '@/shared/assets';
import { IconButton, Typography } from '@/shared/ui';

export type ImageUploaderProps = {
  onImageSelect: (file: File) => void;
  className?: string;
  acceptedFormats?: string[];
  maxSizeInMB?: number;
  placeholder?: string;
};

export const ImageUploader: FC<ImageUploaderProps> = ({
  className,
  onImageSelect,
  acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  maxSizeInMB = 5,
  placeholder = 'Upload Cover Image',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `Only ${acceptedFormats.join(', ')} files are allowed`;
    }

    // eslint-disable-next-line no-magic-numbers
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file.size > maxSizeInBytes) {
      return `File size must be less than ${maxSizeInMB}MB`;
    }

    return null;
  };

  const handleFileSelect = (file: File): void => {
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setPreview(null);

      return;
    }

    setError(null);

    // Create preview
    const reader = new FileReader();

    reader.onload = e => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    onImageSelect(file);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent): void => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      handleFileSelect(imageFile);
    }
  };

  const handleRemoveImage = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    setError(null);
    // Clear input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={clsx(s.container, className)}>
      <label
        className={clsx(s.dropZone, isDragOver && s.dragOver, preview && s.hasPreview, error && s.error)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInputChange}
          className={s.hiddenInput}
          tabIndex={0}
        />

        {preview ? (
          <div className={s.previewContainer}>
            <img src={preview} alt="Preview" className={s.previewImage} />
            <IconButton className={s.removeButton} onClick={handleRemoveImage} aria-label="Remove image" type="button">
              ✕
            </IconButton>
          </div>
        ) : (
          <div className={s.uploadContent}>
            <div className={s.uploadIcon}>
              <ImageUploadIcon width={24} height={24} />
            </div>
            <Typography variant="body2" className={s.uploadText}>
              {placeholder}
            </Typography>
          </div>
        )}
      </label>

      {error && (
        <Typography variant="error" className={s.errorMessage}>
          {error}
        </Typography>
      )}
    </div>
  );
};
