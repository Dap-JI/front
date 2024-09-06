'use client';
import classNames from 'classnames/bind';
import styles from './followPage.module.scss';
import FollowAllData from '@/src/components/profilePage/followAllData';
import { useSearchParams } from 'next/navigation';

const cn = classNames.bind(styles);

type FollowerPageProps = {
  params: {
    userId: string;
  };
};

const FollowPage = ({ params }: FollowerPageProps) => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 'follower';

  return (
    <div className={cn('container')}>
      <div className={cn('secondContainer')}>
        <FollowAllData params={params} initialPage={page} />
      </div>
    </div>
  );
};

export default FollowPage;
