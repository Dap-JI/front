'use client';
import classNames from 'classnames/bind';
import styles from './searchBar.module.scss';
import CommonInput from '@/src/components/common/commonInput';
import { GlassIcon } from '@/public/icon';
import { useState, useEffect } from 'react';
import useDebounce from '@/src/hooks/useDebounce';

const cn = classNames.bind(styles);

type SearchBarProps = {
  onSearchChange: (value: string) => void;
};

const SearchBar = ({ onSearchChange }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, 600); // 0.6초 지연

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  console.log('inputValue--->', inputValue);
  //inputvalue는 입력할 때마다 나오는 텍스트
  //-> inputvalue는끝난 후 searchName업로드

  return (
    <div className={cn('container')}>
      <CommonInput
        placeholder="검색어를 입력하세요"
        suffix={<GlassIcon width="15" height="15" className={cn('glass')} />}
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};
export default SearchBar;
