'use client';

import classNames from 'classnames/bind';
import styles from './DetailPage.module.scss';
import Notification from '@/src/components/climbListDetailPage/notification';
import HoldColorList from '@/src/components/climbListDetailPage/holdColorList';
import { DetailMainContentList } from '@/src/components/climbListDetailPage/detailMainContent';
import { LeftArrowIcon, AddIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

const DetailPage = () => {
  const router = useRouter();
  const backClick = () => {
    router.back();
  };

  // const addClick = ()=>{
  //   router.push()
  // }

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <LeftArrowIcon onClick={backClick} />
        <h1>락랜드</h1>
        <AddIcon />
      </div>
      <div>
        <Notification />
        <HoldColorList />
      </div>
      <div>
        <DetailMainContentList />
      </div>
    </div>
  );
};

export default DetailPage;
