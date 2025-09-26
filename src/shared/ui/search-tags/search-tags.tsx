import { FC, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router';

import { useFindTagsQuery } from '@/entities/tags/api/tags-api';
import { useDebounce } from '@/shared/lib/hooks/use-debaunce';
import { Autocomplete } from '@/shared/ui';

type SearchType = 'tags' | 'artists';

type SearchTagsProps = {
  type: SearchType;
  className?: string;
  label?: string;
  placeholder?: string;
};

export const SearchTags: FC<SearchTagsProps> = ({ type, className, label, placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const paramKey = type === 'tags' ? 'tags' : 'artists';

  const [selectedItems, setSelectedItems] = useState<string[]>(() => {
    return searchParams.get(paramKey)?.split(',').filter(Boolean) || [];
  });

  const { data } = useFindTagsQuery({ value: debouncedSearchTerm }, { skip: type !== 'tags' });

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (selectedItems.length > 0) {
      newSearchParams.set(paramKey, selectedItems.join(','));
    } else {
      newSearchParams.delete(paramKey);
    }

    setSearchParams(newSearchParams);
  }, [selectedItems, searchParams, setSearchParams, paramKey]);

  const options =
    data?.map(item => ({
      label: type === 'tags' ? item.name : item.name,
      value: item.id,
    })) || [];

  const defaultLabel = type === 'tags' ? 'Hashtags' : 'Artists';
  const defaultPlaceholder = type === 'tags' ? 'Search by hashtags' : 'Search by artists';

  return (
    <Autocomplete
      options={options}
      value={selectedItems}
      onChange={setSelectedItems}
      label={label || defaultLabel}
      placeholder={placeholder || defaultPlaceholder}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      className={className}
    />
  );
};
