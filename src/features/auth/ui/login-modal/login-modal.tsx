import { FC } from 'react';

import clsx from 'clsx';

import s from './login-modal.module.scss';

import { useLoginMutation } from '@/entities/auth';
import { setIsAuthModalOpen } from '@/features/auth/model';
import { Path, useAppDispatch } from '@/shared/lib';
import { Button, Dialog, DialogContent, DialogHeader, Typography } from '@/shared/ui';

export const LoginModal: FC = () => {
  const [mutate] = useLoginMutation();

  const dispatch = useAppDispatch();

  const handleCloseAuthModal = (): void => {
    dispatch(setIsAuthModalOpen({ isAuthModalOpen: false }));
  };
  const loginHandler = (): void => {
    const redirectUri = `${import.meta.env.VITE_DOMAIN_ADDRESS}${Path.OAuthRedirect}`;
    const url = `${import.meta.env.VITE_BASE_URL}auth/oauth-redirect?callbackUrl=${redirectUri}`;

    window.open(url, 'oauthPopup', 'width=500,height=600');

    const receiveMessage = async (event: MessageEvent): Promise<void> => {
      if (event.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return;

      const { code } = event.data;

      if (code) {
        window.removeEventListener('message', receiveMessage);
        mutate({ code, accessTokenTTL: '3m', redirectUri, rememberMe: true });
        handleCloseAuthModal();
      }
    };

    window.addEventListener('message', receiveMessage);
  };

  return (
    <Dialog open onClose={handleCloseAuthModal} className={s.dialog}>
      <DialogHeader />

      <DialogContent className={s.content}>
        <Typography variant="h2">
          Millions of Songs. <br /> Free on Music app.
        </Typography>

        <div className={s.icon}>😊</div>

        <Button className={clsx(s.button, s.secondary)} fullWidth onClick={handleCloseAuthModal}>
          Continue without Sign in
        </Button>
        <Button className={s.button} variant="primary" fullWidth onClick={loginHandler}>
          Sign in with APIHub
        </Button>
      </DialogContent>
    </Dialog>
  );
};
