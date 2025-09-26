import type { ComponentProps, FC, ReactNode } from 'react';

import { clsx } from 'clsx';

import s from './icon-button.module.scss';

type IconButtonProps = {
  children: ReactNode;
} & ComponentProps<'button'>;

export const IconButton: FC<IconButtonProps> = ({ children, className, ...props }) => {
  return (
    <button type="button" className={clsx(s.button, className)} {...props}>
      {children}
    </button>
  );
};
