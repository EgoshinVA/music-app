import type { ComponentProps, ReactNode } from 'react';

import { clsx } from 'clsx';

import s from './text-field.module.scss';

import { useGetId } from '@/shared/lib';
import { Typography } from '@/shared/ui';

export type TextFieldSize = 'm' | 'l';

export type TextFieldProps = {
  errorMessage?: string;
  label?: ReactNode;
  icon?: ReactNode;
  inputSize?: TextFieldSize;
} & ComponentProps<'input'>;

export const TextField = ({ className, errorMessage, id, icon, label, inputSize = 'm', ...props }: TextFieldProps) => {
  const showError = Boolean(errorMessage);
  const inputId = useGetId(id);

  return (
    <div className={clsx(s.box, className)}>
      {label && (
        <Typography variant="label" as="label" htmlFor={inputId}>
          {label}
        </Typography>
      )}

      <div className={s.inputWrapper}>
        {icon && <span className={s.icon}>{icon}</span>}
        <input
          className={clsx(s.input, showError && s.error, icon && s.withIcon, inputSize === 'l' && s.large)}
          id={inputId}
          type="text"
          {...props}
        />
      </div>

      {showError && <Typography variant="error">{errorMessage}</Typography>}
    </div>
  );
};
