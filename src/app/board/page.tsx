'use client';
import styles from './boardPage.module.scss';
import classNames from 'classnames/bind';
import Header from '@/src/components/common/header';
import { AddIcon } from '@/public/icon';
import Link from 'next/link';
import CategoryLists from '@/src/components/boardPage/categroyLists';
import { categoryListData, boardListData } from '@/src/utils/dummy';
import { useState } from 'react';
import BoardListDatas from '@/src/components/boardPage/boardListDatas';
import SearchBar from '@/src/components/common/searchBar';

const cn = classNames.bind(styles);

const BoardPage = () => {
  const [selectCategory, setSelectCategory] = useState<string | null>(null);
  const [searchName, setSearchName] = useState('');

  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);
  };

  const boardData = boardListData?.boards ?? [];

  const handleSearchChange = (value: string) => {
    setSearchName(value);
  };

  return (
    <div className={cn('container')}>
      <SearchBar
        showAdd={true}
        searchName={searchName}
        onSearchChange={handleSearchChange}
      />
      <div className={cn('secondContainer')}>
        <CategoryLists
          lists={categoryListData}
          selectCategory={selectCategory}
          onCategorySelect={handleSelectCategory}
        />
        <BoardListDatas lists={boardData} />
      </div>
    </div>
  );
};

export default BoardPage;
