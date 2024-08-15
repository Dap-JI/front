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
  searchName: string;
};

const SearchBar = ({ onSearchChange, searchName }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(searchName);
  const debouncedSearchTerm = useDebounce(inputValue, 500); // 0.6초 지연

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

  return (
    <div className={cn('container')}>
      <CommonInput
        placeholder="검색어를 입력하세요"
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
    </div>
  );
};
export default SearchBar;

//사용자가 검색어를 모두 지우면 inputValue가 빈 문자열이 되고, 이 값이 디바운스된 후 debouncedSearchTerm도 빈 문자열이 된다
//. 그런 다음 onSearchChange 함수가 빈 문자열을 인자로 호출되어 검색 결과를 초기화
//쿼리값이 사라지니 전체 조회가 된다.
