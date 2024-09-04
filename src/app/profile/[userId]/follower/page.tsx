'use client';
import classNames from 'classnames/bind';
import styles from './followerPage.module.scss';
import SearchBar from '@/src/components/common/searchBar';
import { fetchFollowerData } from '@/src/app/profile/api';
import { useQuery } from '@tanstack/react-query';
import FollowLists from '@/src/components/profilePage/followLists';

const cn = classNames.bind(styles);

type FollowerPageProps = {
  params: {
    userId: string;
  };
};

const FollowerPage = ({ params }: FollowerPageProps) => {
  const { userId } = params;

  const { data: followerDatas } = useQuery({
    queryKey: ['followerDatas'],
    queryFn: () => fetchFollowerData(userId),
  });
  console.log(followerDatas);
  return (
    <div className={cn('container')}>
      {/* <SearchBar /> */}
      <div className={cn('secondContainer')}>
        <FollowLists />
      </div>
    </div>
  );
};

export default FollowerPage;
