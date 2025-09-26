import { ChangeEvent, FC } from 'react';

import { useSearchParams } from 'react-router';

import s from './sort-select.module.scss';

import { Select, SelectProps } from '@/shared/ui/select/select';

export const SortSelect: FC = (props: Omit<SelectProps, 'options'>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get('sortBy') || 'addedAt';
  const currentSortDirection = searchParams.get('sortDirection') || 'desc';
  const currentValue = `${currentSortBy}_${currentSortDirection}`;

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const [sortBy, sortDirection] = event.target.value.split('_');

    setSearchParams(prev => {
      prev.set('sortBy', sortBy);
      prev.set('sortDirection', sortDirection);

      return prev;
    });
  };

  return (
    <label className={s.selectLabel}>
      Sort By
      <Select
        {...props}
        value={currentValue}
        onChange={handleSortChange}
        options={[
          { value: 'addedAt_desc', label: 'Newest first' },
          { value: 'addedAt_asc', label: 'Oldest first' },
          { value: 'likesCount_desc', label: 'Most liked' },
          { value: 'likesCount_asc', label: 'Least liked' },
        ]}
        className={s.select}
      />
    </label>
  );
};
