'use client';
import SearchBar from '@/src/components/common/searchBar';
import classNames from 'classnames/bind';
import styles from './ClimbListPage.module.scss';
import CardListData from '@/src/components/climbListPage/cardListData';
import { useQuery } from '@tanstack/react-query';
import fetchData from '@/src/utils/fetchData';

const cn = classNames.bind(styles);

const ClimbListPage = () => {
  // const { data: climbListDatas } = useQuery({
  //   queryKey: ['climbList'],
  //   queryFn: () =>
  //     fetchData({
  //       param: `/api/gyms`,
  //     }),
  // });

  // console.log(climbListDatas);

  return (
    <div className={cn('container')}>
      <SearchBar />
      <CardListData />
    </div>
  );
};

export default ClimbListPage;
