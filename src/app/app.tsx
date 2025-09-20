import { Outlet } from 'react-router';
import { Header } from '@/widgets/header';

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
