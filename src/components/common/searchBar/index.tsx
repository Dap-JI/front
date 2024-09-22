'use client';
import classNames from 'classnames/bind';
import styles from './searchBar.module.scss';
import CommonInput from '@/src/components/common/commonInput';
import { GlassIcon, AddIcon } from '@/public/icon';
import { useState, useEffect } from 'react';
import useDebounce from '@/src/hooks/useDebounce';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type SearchBarProps = {
  onSearchChange: (value: string) => void;
  searchName: string;
  showAdd?: boolean;
  placeholder: string;
};

const SearchBar = ({
  onSearchChange,
  searchName,
  showAdd,
  placeholder,
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(searchName);
  const debouncedSearchTerm = useDebounce(inputValue, 500); // 0.6초 지연
  const router = useRouter();
  useEffect(() => {
    if (debouncedSearchTerm || debouncedSearchTerm === '') {
      onSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchChange]);

  useEffect(() => {
    setInputValue(searchName);
  }, [searchName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const uploadClick = () => {
    router.replace('/board/upload');
  };

  return (
    <div className={cn('container')}>
      <CommonInput
        placeholder={placeholder}
        suffix={
          <GlassIcon
            width="15"
            height="15"
            className={cn('glass')}
            fill="black"
          />
        }
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      {showAdd && <AddIcon width="30" height="30" onClick={uploadClick} />}
    </div>
  );
};
export default SearchBar;
