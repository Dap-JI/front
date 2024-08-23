'use client';
import styles from './boardPage.module.scss';
import classNames from 'classnames/bind';
import CategoryLists from '@/src/components/boardPage/categroyLists';
import { categoryListData } from '@/src/utils/dummy';
import { useState } from 'react';
import BoardLists from '@/src/components/boardPage/boardLists';
import SearchBar from '@/src/components/common/searchBar';
import useScrollDirection from '@/src/hooks/useScrollDirection';
import { boardListGetDatas } from './api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { BoardResponseType } from '@/src/utils/type';

const cn = classNames.bind(styles);

const BoardPage = () => {
  const [selectCategory, setSelectCategory] = useState<string | null>(null);
  const [searchName, setSearchName] = useState('');
  const [scrollDirection] = useScrollDirection('up');

  const { data: boardListGetData } = useInfiniteScroll<BoardResponseType>({
    queryKey: ['boardListData'],
    fetchFunction: (page = 1) =>
      boardListGetDatas({ page, search: searchName }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const boardData =
    boardListGetData?.pages.flatMap((page) => page.boards) ?? [];

  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);
  };

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
          showAdd={true}
          searchName={searchName}
          onSearchChange={handleSearchChange}
        />
        <CategoryLists
          lists={categoryListData}
          selectCategory={selectCategory}
          onCategorySelect={handleSelectCategory}
        />
      </div>
      <div className={cn('secondContainer')}>
        <BoardLists lists={boardData} />
      </div>
    </div>
  );
};

export default BoardPage;
