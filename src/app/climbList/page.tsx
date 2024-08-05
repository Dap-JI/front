'use client';
import SearchBar from '@/src/components/common/searchBar';
import classNames from 'classnames/bind';
import styles from './ClimbListPage.module.scss';
import CardListData from '@/src/components/climbListPage/cardListData';
import { useClimbList } from '@/src/app/climbList/api';
import { ClimbLIstTypes, ClimbLIstType } from '@/src/utils/type';

const cn = classNames.bind(styles);

const ClimbListPage = () => {
  const { data: climbListDatas } = useClimbList();

  const climbList = climbListDatas?.gyms ?? [];

  return (
    <div className={cn('container')}>
      <SearchBar />
      <CardListData lists={climbList} />
    </div>
  );
};

export default ClimbListPage;
