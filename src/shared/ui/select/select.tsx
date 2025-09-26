import type { ComponentProps, FC, ReactNode } from 'react';

import { clsx } from 'clsx';

import s from './select.module.scss';

import { ArrowDownIcon } from '@/shared/assets';
import { useGetId } from '@/shared/lib';
import { Typography } from '@/shared/ui';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  label?: ReactNode;
  errorMessage?: string;
  options: SelectOption[];
  placeholder?: string;
} & ComponentProps<'select'>;

export const Select: FC<SelectProps> = ({ className, errorMessage, id, label, options, placeholder, ...props }) => {
  const showError = Boolean(errorMessage);
  const selectId = useGetId(id);

  return (
    <div className={clsx(s.container, className)}>
      {label && (
        <Typography variant="label" as="label" htmlFor={selectId} className={clsx(s.label, showError && s.error)}>
          {label}
        </Typography>
      )}

      <div className={s.selectWrapper}>
        <select className={clsx(s.select, showError && s.error)} id={selectId} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <ArrowDownIcon className={s.icon} />
      </div>

      {showError && <Typography variant="error">{errorMessage}</Typography>}
    </div>
  );
};
