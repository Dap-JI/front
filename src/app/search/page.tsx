'use client';
import classNames from 'classnames/bind';
import styles from './searchPage.module.scss';
import useScrollDirection from '@/src/hooks/useScrollDirection';
import { useState } from 'react';
import SearchBar from '@/src/components/common/searchBar';
import SearchLists from '@/src/components/searchPage/searchLists';
import { fetchUserSearch } from './api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { UserSearchType } from '@/src/utils/type';

const cn = classNames.bind(styles);

const SearchPage = () => {
  const [searchName, setSearchName] = useState('');
  const [scrollDirection] = useScrollDirection('up');

  const { data: userSearchDatas, ref } = useInfiniteScroll<UserSearchType>({
    queryKey: ['userSearchDatas', searchName],
    fetchFunction: (page = 1) => fetchUserSearch({ page, search: searchName }),
    enabled: !!searchName,
    getNextPageParam: (lastPage) =>
      lastPage?.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const userSearchData =
    userSearchDatas?.pages.flatMap((page) => page?.users) ?? [];

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
        <SearchLists lists={userSearchData} />
        <div ref={ref} />
      </div>
    </div>
  );
};

export default SearchPage;
