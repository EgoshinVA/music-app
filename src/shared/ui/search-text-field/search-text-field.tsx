import { ChangeEvent, FC } from 'react';

import { useSearchParams } from 'react-router';

import { SearchIcon } from '@/shared/assets';
import { TextField, TextFieldProps } from '@/shared/ui';

export const SearchTextField: FC = (props: Omit<TextFieldProps, 'icon' | 'inputSize'>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchParams(prev => {
      if (e.target.value === '') {
        prev.delete('search');
      } else {
        prev.set('search', e.target.value);
        prev.set('page', '1');
      }

      return prev;
    });
  };

  const search = searchParams.get('search') || '';

  return (
    <TextField
      {...props}
      value={search}
      onChange={handleChange}
      icon={<SearchIcon width={20} height={20} />}
      inputSize="l"
      autoComplete="off"
      placeholder="Search playlists"
    />
  );
};
