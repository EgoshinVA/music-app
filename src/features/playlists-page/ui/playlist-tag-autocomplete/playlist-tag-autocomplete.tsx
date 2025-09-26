import { FC, useState } from 'react';

import { useFindTagsQuery } from '@/entities/tags/api/tags-api';
import { Autocomplete } from '@/shared/ui';

export const PlaylistTagAutocomplete: FC<{
  value: string[];
  onChange: (value: string[]) => void;
}> = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: tags } = useFindTagsQuery({ value: searchTerm });

  const options =
    tags?.map(tag => ({
      label: tag.name,
      value: tag.id,
    })) ?? [];

  return (
    <Autocomplete
      label="Hashtags"
      value={value}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onChange={onChange}
      maxTags={5}
      options={options}
    />
  );
};
