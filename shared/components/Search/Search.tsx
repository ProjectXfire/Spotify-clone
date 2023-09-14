'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useDebounce } from '@/shared/hooks';
import { TextField } from '@mui/material';

interface Props {
  queryName: string;
}

function Search({ queryName }: Props): JSX.Element {
  const router = useRouter();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      [queryName]: debouncedValue
    };
    const url = qs.stringifyUrl({ url: '/search', query });
    if (debouncedValue) {
      router.push(url);
    } else {
      router.replace('/search');
    }
  }, [debouncedValue, queryName, router]);

  console.log('called');

  return (
    <TextField
      sx={{ width: { md: 400 }, mx: 1 }}
      type='text'
      color='info'
      label='Song title'
      value={value}
      onChange={onSearch}
    />
  );
}
export default Search;
