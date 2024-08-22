'use client';
import styles from './boardPage.module.scss';
import classNames from 'classnames/bind';
import CategoryLists from '@/src/components/boardPage/categroyLists';
import { categoryListData, boardListData } from '@/src/utils/dummy';
import { useState } from 'react';
import BoardListDatas from '@/src/components/boardPage/boardListDatas';
import SearchBar from '@/src/components/common/searchBar';
import useScrollDirection from '@/src/hooks/useScrollDirection';
import { boardListDatas } from './api';
import { useQuery } from '@tanstack/react-query';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';

const cn = classNames.bind(styles);

const BoardPage = () => {
  const [selectCategory, setSelectCategory] = useState<string | null>(null);
  const [searchName, setSearchName] = useState('');
  const [scrollDirection] = useScrollDirection('up');

  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);
  };

  const boardData = boardListData?.boards ?? [];

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
        <BoardListDatas lists={boardData} />
      </div>
    </div>
  );
};

export default BoardPage;
