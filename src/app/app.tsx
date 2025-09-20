import { FC } from 'react';

import { Outlet } from 'react-router';

import { Header } from '@/widgets/header';

export const App: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
