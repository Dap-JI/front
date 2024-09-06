import React, { useState } from 'react';
import styles from './searchLists.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import FollowingBtn from '../../common/followingBtn';
import useFollowRequest from '@/src/hooks/useFollowRequest';

const cn = classNames.bind(styles);

const SearchList = () => {
  // const { isFollow, handleFollowRequest } = useFollowRequest({
  //   userId: userId,
  //   initalFollowToggle: isFollowing,
  // });
  const [isFollow, setIsFollw] = useState(false);
  const followClick = () => {
    console.log('z클릭');
  };
  return (
    <li className={cn('container')}>
      <Image
        src={'/icon/icon.png'}
        width="50"
        height="50"
        alt="유저 검색 프로필 이미지"
        className={cn('profileImage')}
        priority
      />
      <div className={cn('userInfo')}>
        <span>디옹디옹이디옹디옹이</span>
        <FollowingBtn onClick={followClick} isFollow={isFollow} />
      </div>
    </li>
  );
};

const SearchLists = () => {
  return (
    <ul className={cn('outerContainer')}>
      <SearchList />
      <SearchList />
      <SearchList />
      <SearchList />
    </ul>
  );
};

export default SearchLists;
