'use client';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './followAllData.module.scss';
import FollowerLists from '../followerLists';
import FollowingLists from '../followingLists';

const cn = classNames.bind(styles);

type FollowAllDataProps = {
  params: {
    userId: string;
  };
  initialPage: string;
};

const FollowAllData = ({ params, initialPage }: FollowAllDataProps) => {
  const [selectList, setSelectList] = useState<string>(initialPage);
  const [underlineStyle, setUnderlineStyle] = useState({
    left: initialPage === 'follower' ? '0%' : '50%',
  });
  const handleIconClick = (type: string, left: string) => {
    setSelectList(type);
    setUnderlineStyle({ left });
  };

  return (
    <div className={cn('container')}>
      <nav
        className={cn('iconWrapper')}
        aria-label="팔로워 및 팔로잉 목록 탐색"
      >
        <div
          className={cn('icon')}
          onClick={() => handleIconClick('follower', '0%')}
          aria-label="팔로워 목록"
        >
          <p>클로워</p>
        </div>
        <div
          className={cn('icon')}
          onClick={() => handleIconClick('following', '50%')}
          aria-label="팔로잉 목록"
        >
          <p>클로잉</p>
        </div>
        <div className={cn('underline')} style={underlineStyle} />
      </nav>
      {selectList === 'follower' ? (
        <FollowerLists params={params} />
      ) : (
        <FollowingLists params={params} />
      )}
    </div>
  );
};

export default FollowAllData;
