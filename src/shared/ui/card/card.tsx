import type { ComponentProps, ElementType, ReactNode } from 'react';

import { clsx } from 'clsx';

import s from './card.module.scss';

export type CardProps<T extends ElementType = 'div'> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & ComponentProps<T>;

export const Card = <T extends ElementType = 'div'>({
  as: Component = 'div',
  className,
  children,
  ...props
}: CardProps<T>) => {
  return (
    <Component className={clsx(s.card, className)} {...props}>
      {children}
    </Component>
  );
};
