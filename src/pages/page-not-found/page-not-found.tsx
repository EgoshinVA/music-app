import { FC } from 'react';

import s from './page-not-found.module.scss';

export const PageNotFound: FC = () => {
  return (
    <>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subtitle}>page not found</h2>
    </>
  );
};
