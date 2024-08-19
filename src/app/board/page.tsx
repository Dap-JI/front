'use client';
import styles from './boardPage.module.scss';
import classNames from 'classnames/bind';
import Header from '@/src/components/common/header';
import { AddIcon } from '@/public/icon';
import Link from 'next/link';
import CategoryLists from '@/src/components/boardPage/categroyLists';
import { categoryListData } from '@/src/utils/dummy';
import { useState } from 'react';

const cn = classNames.bind(styles);

const BoardPage = () => {
  const [selectCategory, setSelectCategory] = useState<string | null>(null);
  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);
  };

  return (
    <div className={cn('container')}>
      <Header title="게시판임">
        <Link href={'/board/upload'}>
          <AddIcon />
        </Link>
      </Header>
      <div className={cn('secondContainer')}>
        <CategoryLists
          lists={categoryListData}
          selectCategory={selectCategory}
          onCategorySelect={handleSelectCategory}
        />
        <div>게시물 카드 리스트들들</div>
      </div>
    </div>
  );
};

export default BoardPage;
