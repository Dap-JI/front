'use client';
import classNames from 'classnames/bind';
import styles from './followPage.module.scss';
import FollowAllData from '@/src/components/profilePage/followAllData';
import Header from '@/src/components/common/header';

const cn = classNames.bind(styles);

type FollowerPageProps = {
  params: {
    userId: string;
  };
};

const FollowPage = ({ params }: FollowerPageProps) => {
  return (
    <div className={cn('container')}>
      <Header back={true} />
      <div className={cn('secondContainer')}>
        <FollowAllData params={params} />
      </div>
    </div>
  );
};

export default FollowPage;
