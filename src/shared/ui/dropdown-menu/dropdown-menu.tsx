import { type ComponentProps, type ElementType, FC, type ReactNode, MouseEvent } from 'react';

import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from '@headlessui/react';
import { clsx } from 'clsx';

import s from './dropdown-menu.module.scss';

export type DropdownMenuProps = {
  children: ReactNode;
  className?: string;
};

export const DropdownMenu: FC<DropdownMenuProps> = ({ children, className }) => {
  return (
    <Menu as="div" className={clsx(s.container, className)}>
      {children}
    </Menu>
  );
};

export type DropdownMenuTriggerProps = {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
};

export const DropdownMenuTrigger: FC<DropdownMenuTriggerProps> = ({ children, className, asChild = false }) => {
  const handleClick = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  if (asChild) {
    return (
      <MenuButton as="div" className={className} onClick={handleClick}>
        {children}
      </MenuButton>
    );
  }

  return (
    <MenuButton className={clsx(s.trigger, className)} onClick={handleClick}>
      {children}
    </MenuButton>
  );
};

export type DropdownMenuContentProps = {
  children: ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
};

export const DropdownMenuContent: FC<DropdownMenuContentProps> = ({
  children,
  className,
  align = 'end',
  side = 'bottom',
}) => {
  return (
    <MenuItems portal anchor="bottom" className={clsx(s.content, s[`align-${align}`], s[`side-${side}`], className)}>
      {children}
    </MenuItems>
  );
};

export type DropdownMenuItemProps<T extends ElementType = 'button'> = {
  as?: T;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
} & ComponentProps<T>;

export const DropdownMenuItem = <T extends ElementType = 'button'>({
  as: Component = 'button',
  children,
  onClick,
  className,
  disabled = false,
  ...props
}: DropdownMenuItemProps<T>) => {
  const handleClick = (event: MouseEvent): void => {
    event.stopPropagation();
    if (disabled) return;
    onClick?.();
  };

  return (
    <MenuItem disabled={disabled}>
      <Component
        {...(Component === 'button' && { type: 'button' })}
        className={clsx(s.item, disabled && s.itemDisabled, className)}
        onClick={handleClick}
        {...(Component === 'button' && { disabled })}
        {...props}
      >
        {children}
      </Component>
    </MenuItem>
  );
};

export type DropdownMenuSeparatorProps = {
  className?: string;
};

export const DropdownMenuSeparator: FC<DropdownMenuSeparatorProps> = ({ className }) => {
  return <MenuSeparator className={clsx(s.separator, className)} />;
};
