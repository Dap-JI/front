'use client';
import styles from './boardUploadForm.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { categoryListData } from '@/src/utils/dummy';
import CategoryLists from '../../boardPage/categroyLists';

const cn = classNames.bind(styles);

const BoardUploadForm = () => {
  const [selectCategory, setSelectCategory] = useState<string | null>(null);
  //카테고리 선택
  const uploadCategory = categoryListData.filter(
    (category) => category.category !== '전체',
  );
  //카테고리 필터 (전체 제외)
  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);
  };
  //카테고리 셀렉
  
  return (
    <div>
      <CategoryLists
        lists={uploadCategory}
        selectCategory={selectCategory}
        onCategorySelect={handleSelectCategory}
      />
    </div>
  );
};

export default BoardUploadForm;
