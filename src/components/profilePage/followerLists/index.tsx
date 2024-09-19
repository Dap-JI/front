import classNames from 'classnames/bind';
import styles from './followerLists.module.scss';
import Image from 'next/image';
import { DeleteIcon } from '@/public/icon';
import { FollowerType, FollowDetailType } from '@/src/utils/type';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { fetchFollowerData } from '@/src/app/profile/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '../../common/searchBar';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../common/loadingSpinner';

const cn = classNames.bind(styles);

type FollowerListProps = {
  list: FollowDetailType;
};

const FollowerList = ({ list }: FollowerListProps) => {
  const { user_idx, nickname, img } = list;
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

type FollowerListsProps = {
  params: {
    userId: string;
  };
};

const FollowerLists = ({ params }: FollowerListsProps) => {
  const { userId } = params;
  const queryClient = useQueryClient();

  const [searchName, setSearchName] = useState('');

  const {
    data: followerDatas,
    ref,
    isLoading,
  } = useInfiniteScroll<FollowerType>({
    queryKey: ['followerDatas', userId, searchName],
    fetchFunction: (page = 1) =>
      fetchFollowerData({ page, search: searchName, userId }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const followerData =
    followerDatas?.pages.flatMap((page) => page.followers) ?? [];

  const handleSearchChange = (value: string) => {
    setSearchName(value);
  };

  useEffect(() => {
    if (searchName !== '') {
      queryClient.invalidateQueries({ queryKey: ['followerDatas'] });
    }
  }, [searchName, queryClient]);

  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <div className={cn('outerContainer')}>
      <SearchBar
        searchName={searchName}
        onSearchChange={handleSearchChange}
        placeholder="클로워를 검색해 보세요"
      />
      <div className={cn('followerDataContainer')}>
        {followerData.map((list: FollowDetailType) => (
          <FollowerList key={list.user_idx} list={list} />
        ))}
      </div>
      <div ref={ref} />
    </div>
  );
};

export default FollowerLists;
