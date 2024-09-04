'use client';
import classNames from 'classnames/bind';
import styles from './followingPage.module.scss';
import SearchBar from '@/src/components/common/searchBar';
import { fetchFollowingData } from '@/src/app/profile/api';
import { useQuery } from '@tanstack/react-query';
import FollowLists from '@/src/components/profilePage/followLists';

const cn = classNames.bind(styles);

type FollowingPageProps = {
  params: {
    userId: string;
  };
};

const FollowingPage = ({ params }: FollowingPageProps) => {
  const { userId } = params;

  const { data: followingDatas } = useQuery({
    queryKey: ['followingDatas'],
    queryFn: () => fetchFollowingData(userId),
  });
  console.log(followingDatas);

  return (
    <div className={cn('container')}>
      <SearchBar />
      <div className={cn('secondContainer')}>
        <FollowLists />
      </div>
    </div>
  );
};

export default FollowingPage;
