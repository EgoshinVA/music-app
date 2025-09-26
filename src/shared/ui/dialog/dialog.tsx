import { createContext, FC, type ReactNode, use, useEffect, MouseEvent } from 'react';

import { clsx } from 'clsx';
import { createPortal } from 'react-dom';

import s from './dialog.module.scss';

import { IconButton } from '@/shared/ui';

type DialogContextType = {
  onClose?: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

const useDialogContext = () => {
  const context = use(DialogContext);

  if (!context) {
    throw new Error('dialog compound components must be used within dialog component');
  }

  return context;
};

export type DialogProps = {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
  className?: string;
};

export const Dialog: FC<DialogProps> = ({ children, open, onClose, className }) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  // Add global keydown handler for ESC key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const dialogContent = (
    <div className={s.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <section className={clsx(s.dialog, className)}>
        <DialogContext value={{ onClose }}>{children}</DialogContext>
      </section>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

/*
 * DialogHeader
 */

export type DialogHeaderProps = {
  children?: ReactNode;
  className?: string;
  showCloseButton?: boolean;
};

export const DialogHeader: FC<DialogHeaderProps> = ({ children, className, showCloseButton = true }) => {
  const { onClose } = useDialogContext();

  return (
    <header className={clsx(s.header, className)}>
      <div>{children}</div>
      {showCloseButton && (
        <IconButton onClick={onClose} aria-label="Close dialog" type="button">
          ✕
        </IconButton>
      )}
    </header>
  );
};

/*
 * DialogContent
 */

export type DialogContentProps = {
  children: ReactNode;
  className?: string;
};

export const DialogContent: FC<DialogContentProps> = ({ children, className }) => {
  return <div className={clsx(s.content, className)}>{children}</div>;
};

/*
 * DialogFooter
 */

export type DialogFooterProps = {
  children: ReactNode;
  className?: string;
};

export const DialogFooter: FC<DialogFooterProps> = ({ children, className }) => {
  return <footer className={clsx(s.footer, className)}>{children}</footer>;
};
