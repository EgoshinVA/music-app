import type { ComponentProps, ElementType } from 'react';

import { clsx } from 'clsx';

import s from './button.module.scss';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T;
  fullWidth?: boolean;
  variant?: ButtonVariant;
} & ComponentProps<T>;

export const Button = <T extends ElementType = 'button'>({
  as: Component = 'button',
  children,
  className,
  fullWidth = false,
  variant = 'primary',
  ...props
}: ButtonProps<T>) => {
  const classNames = clsx(s.button, s[variant], fullWidth && s.fullWidth, className);

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};
