import classNames from 'classnames/bind';
import styles from './followingLists.module.scss';
import Image from 'next/image';
import { DeleteIcon } from '@/public/icon';
import { FollowingType, FollowDetailType } from '@/src/utils/type';
import { fetchFollowingData } from '@/src/app/profile/api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useScrollDirection from '@/src/hooks/useScrollDirection';
import { useQueryClient } from '@tanstack/react-query';
import SearchBar from '../../common/searchBar';

const cn = classNames.bind(styles);

type FollowingListProps = {
  list: FollowDetailType;
};

const FollowingList = ({ list }: FollowingListProps) => {
  const { nickname, user_idx, img } = list;

  const [scrollDirection] = useScrollDirection('up');
  const router = useRouter();

  const profilePageClick = () => {
    router.push(`/profile/${user_idx}`);
  };
  return (
    <div className={cn('container')}>
      <div className={cn('infoWrapper')} onClick={profilePageClick}>
        <Image
          src={img || '/icon/icon.png'}
          width={50}
          height={50}
          className={cn('profileImage')}
          alt="팔로우 페이지 프로필 이미지"
          priority
        />
        <span>{nickname}</span>
      </div>
    </div>
  );
};

type FollowingListsProps = {
  params: {
    userId: string;
  };
};

const FollowingLists = ({ params }: FollowingListsProps) => {
  const { userId } = params;
  const queryClient = useQueryClient();

  const [searchName, setSearchName] = useState('');

  const { data: followingDatas, ref } = useInfiniteScroll<FollowingType>({
    queryKey: ['followingDatas', userId, searchName],
    fetchFunction: (page = 1) =>
      fetchFollowingData({ page, search: searchName, userId }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const followingData =
    followingDatas?.pages.flatMap((page) => page.following) ?? [];

  const handleSearchChange = (value: string) => {
    setSearchName(value);
  };

  useEffect(() => {
    if (searchName !== '') {
      queryClient.invalidateQueries({ queryKey: ['followerDatas'] });
    }
  }, [searchName, queryClient]);

  return (
    <div className={cn('outerContainer')}>
      <SearchBar
        searchName={searchName}
        onSearchChange={handleSearchChange}
        placeholder="클로잉을 검색해 보세요"
      />
      <div className={cn('followingDataContainer')}>
        {followingData.map((list: FollowDetailType) => (
          <FollowingList key={list.user_idx} list={list} />
        ))}
      </div>
      <div ref={ref} />
    </div>
  );
};

export default FollowingLists;
