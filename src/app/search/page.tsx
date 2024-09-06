'use client';
import classNames from 'classnames/bind';
import styles from './searchPage.module.scss';
import useScrollDirection from '@/src/hooks/useScrollDirection';
import { useState } from 'react';
import SearchBar from '@/src/components/common/searchBar';
import SearchLists from '@/src/components/searchPage/searchLists';

const cn = classNames.bind(styles);

const SearchPage = () => {
  const [searchName, setSearchName] = useState('');
  const [scrollDirection] = useScrollDirection('up');

  const handleSearchChange = (value: string) => {
    setSearchName(value);
  };

  return (
    <div className={cn('container')}>
      <div
        className={cn('header-container', {
          up: scrollDirection === 'up',
          down: scrollDirection === 'down',
        })}
      >
        <SearchBar
          searchName={searchName}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className={cn('secondContainer')}>
        <SearchLists />
      </div>
    </div>
  );
};

export default SearchPage;
