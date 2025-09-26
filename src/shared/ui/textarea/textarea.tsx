import type { ComponentProps, ReactNode } from 'react';

import { clsx } from 'clsx';

import s from './textarea.module.scss';

import { useGetId } from '@/shared/lib';
import { Typography } from '@/shared/ui';

export type TextareaProps = {
  errorMessage?: string;
  label?: ReactNode;
} & ComponentProps<'textarea'>;

export const Textarea = ({ className, errorMessage, id, label, ...props }: TextareaProps) => {
  const showError = Boolean(errorMessage);
  const textareaId = useGetId(id);

  return (
    <div className={clsx(s.box, className)}>
      {label && (
        <Typography variant="label" as="label" htmlFor={textareaId}>
          {label}
        </Typography>
      )}

      <textarea className={clsx(s.textarea, showError && s.error)} id={textareaId} {...props} />

      {showError && <Typography variant="error">{errorMessage}</Typography>}
    </div>
  );
};
