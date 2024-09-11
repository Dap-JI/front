'use client';
import styles from './boardPage.module.scss';
import classNames from 'classnames/bind';
import CategoryLists from '@/src/components/boardPage/categroyLists';
import { categoryListData } from '@/src/utils/categoryListDatas';
import { useState, useEffect } from 'react';
import BoardLists from '@/src/components/boardPage/boardLists';
import SearchBar from '@/src/components/common/searchBar';
import useScrollDirection from '@/src/hooks/useScrollDirection';
import { boardListGetDatas } from './api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { BoardResponseType } from '@/src/utils/type';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '@/src/components/common/loadingSpinner';

const cn = classNames.bind(styles);

const BoardPage = () => {
  const [selectCategory, setSelectCategory] = useState<string | null>('전체');
  const [searchName, setSearchName] = useState('');
  const [scrollDirection] = useScrollDirection('up');
  const queryClient = useQueryClient();

  const {
    data: boardListGetData,
    ref,
    isLoading,
  } = useInfiniteScroll<BoardResponseType>({
    queryKey: ['boardListData', selectCategory, searchName],
    fetchFunction: (page = 1) =>
      boardListGetDatas({ page, search: searchName, category: selectCategory }),
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

  useEffect(() => {
    if (searchName !== '') {
      queryClient.invalidateQueries({ queryKey: ['boardListData'] });
    }
  }, [searchName, selectCategory, queryClient]);
  
  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <div
        className={cn('header-container', {
          up: scrollDirection === 'up',
          down: scrollDirection === 'down',
        })}
      >
        <SearchBar
          placeholder="게시글을 검색해 보세요"
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
        <div ref={ref} />
      </div>
    </div>
  );
};

export default BoardPage;
