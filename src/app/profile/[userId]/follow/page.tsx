'use client';
import classNames from 'classnames/bind';
import styles from './followPage.module.scss';
import SearchBar from '@/src/components/common/searchBar';
import { fetchFollowerData, fetchFollowingData } from '@/src/app/profile/api';
import { useQuery } from '@tanstack/react-query';
import FollowAllData from '@/src/components/profilePage/followAllData';
import useScrollDirection from '@/src/hooks/useScrollDirection';
import { FollowerType, FollowingType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type FollowerPageProps = {
  params: {
    userId: string;
  };
};

const FollowPage = ({ params }: FollowerPageProps) => {
  const { userId } = params;
  const [scrollDirection] = useScrollDirection('up');

  //팔로워 데이터
  const { data: followerDatas } = useQuery<FollowingType>({
    queryKey: ['followerDatas'],
    queryFn: () => fetchFollowerData(userId),
  });
  const followerData = followerDatas?.data ?? [];
  console.log(followerDatas);

  //팔로잉 데이터
  const { data: followingDatas } = useQuery<FollowerType>({
    queryKey: ['followingDatas'],
    queryFn: () => fetchFollowingData(userId),
  });
  const followingData = followingDatas?.data ?? [];

  const followObject = {
    followerObject: followerData,
    followingObject: followingData,
  };

  return (
    <div className={cn('container')}>
      <div
        className={cn('header-container', {
          up: scrollDirection === 'up',
          down: scrollDirection === 'down',
        })}
      >
        <SearchBar />
      </div>
      <div className={cn('secondContainer')}>
        <FollowAllData followObject={followObject} />
      </div>
    </div>
  );
};

export default FollowPage;

//팔로잉 팔로우 삭제에는 invalidate설정 안하기
//실수로 햇을수도 있으니까

//검색을 해야된까 페이지에서 데이터 객체로 묵어서 내려주기

//followAllData타입 지정해주기
