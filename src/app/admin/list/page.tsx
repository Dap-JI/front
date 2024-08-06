'use client';
import SearchBar from '@/src/components/common/searchBar';
import classNames from 'classnames/bind';
import styles from './adminList.module.scss';
import AdminClimbListDatas from '@/src/components/adminPage/adminClimbListPage/AdminClimbListDatas';
import { ClimbListDatas } from '@/src/app/climbList/api';
import { ClimbLIstResponseType } from '@/src/utils/type';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { useQueryClient } from '@tanstack/react-query';
import Header from '@/src/components/common/header';
import { AddIcon } from '@/public/icon';
import Link from 'next/link';

const cn = classNames.bind(styles);

const AdminClimbListPage = () => {
  const [searchName, setSearchName] = useState('');

  const {
    data: climbListData,
    ref,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <Header title={'클라이밍짐 리스트 관리'}>
        <Link href='/admin/list/upload'>
          <AddIcon />
        </Link>
      </Header>
      <div className={cn('searchBar')}>
        <SearchBar
          searchName={searchName}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className={cn('secondContainer')}>
        <AdminClimbListDatas lists={lists} />
      </div>
      <div />
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} />
    </div>
  );
};

export default AdminClimbListPage;
