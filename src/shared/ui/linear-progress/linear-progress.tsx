import { FC } from 'react';

import s from './linear-progress.module.scss';

type Props = {
  height?: number;
};

export const LinearProgress: FC<Props> = ({ height = 4 }) => {
  return (
    <div className={s.root} style={{ height }}>
      <div className={`${s.bar} ${s.indeterminate1}`} />
      <div className={`${s.bar} ${s.indeterminate2}`} />
    </div>
  );
};
