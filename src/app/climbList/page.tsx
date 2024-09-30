'use client';
import SearchBar from '@/src/components/common/searchBar';
import classNames from 'classnames/bind';
import styles from './ClimbListPage.module.scss';
import CardListData from '@/src/components/climbListPage/cardListData';
import { ClimbListDatas } from '@/src/app/climbList/api';
import { ClimbLIstResponseType } from '@/src/utils/type';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { useState } from 'react';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import useScrollDirection from '@/src/hooks/useScrollDirection';
import CategoryLists from '@/src/components/boardPage/categroyLists';
import { favoritecategoryListData } from '@/src/utils/categoryListDatas';

const cn = classNames.bind(styles);

const ClimbListPage = () => {
  const [searchName, setSearchName] = useState('');
  const [scrollDirection] = useScrollDirection('up');
  const [selectCategory, setSelectCategory] = useState<string | null>('인기순');
  const [isFavorite, setIsFavorite] = useState<any>(false);

  const {
    data: climbListData,
    ref,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteScroll<ClimbLIstResponseType>({
    queryKey: ['climbList', searchName, isFavorite],
    fetchFunction: (page = 1) =>
      ClimbListDatas({ page, search: searchName, is_favorite: isFavorite }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const lists = climbListData?.pages.flatMap((page) => page.gyms) ?? [];

  const handleSearchChange = (value: string) => {
    setSearchName(value);
  };

  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);

    if (category === '즐겨찾기') {
      setIsFavorite(true);
      return;
    }
    setIsFavorite(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
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
          placeholder="클라이밍장을 검색해 보세요"
          searchName={searchName}
          onSearchChange={handleSearchChange}
        />
        <CategoryLists
          lists={favoritecategoryListData}
          selectCategory={selectCategory}
          onCategorySelect={handleSelectCategory}
        />
      </div>
      <div className={cn('secondContainer')}>
        <CardListData lists={lists} />
        <div ref={ref} />
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default ClimbListPage;
