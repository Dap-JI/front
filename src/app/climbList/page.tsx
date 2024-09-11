'use client';
import SearchBar from '@/src/components/common/searchBar';
import classNames from 'classnames/bind';
import styles from './ClimbListPage.module.scss';
import CardListData from '@/src/components/climbListPage/cardListData';
import { ClimbListDatas } from '@/src/app/climbList/api';
import { ClimbLIstResponseType } from '@/src/utils/type';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { useQueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import Loading from '@/src/app/climbList/loading';
import useScrollDirection from '@/src/hooks/useScrollDirection';

const cn = classNames.bind(styles);

const ClimbListPage = () => {
  const [searchName, setSearchName] = useState('');
  const [scrollDirection] = useScrollDirection('up');

  const {
    data: climbListData,
    ref,
    isFetchingNextPage,
  } = useInfiniteScroll<ClimbLIstResponseType>({
    queryKey: ['climbList', searchName],
    fetchFunction: (page = 1) => ClimbListDatas({ page, search: searchName }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const lists = climbListData?.pages.flatMap((page) => page.gyms) ?? [];

  const handleSearchChange = (value: string) => {
    setSearchName(value);
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    if (searchName !== '') {
      queryClient.invalidateQueries({ queryKey: ['climbList'] });
    }
  }, [searchName, queryClient]);

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
      </div>
      <div className={cn('secondContainer')}>
        <Suspense fallback={<Loading />}>
          <CardListData lists={lists} />
          <div ref={ref} />
        </Suspense>
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
};

export default ClimbListPage;
