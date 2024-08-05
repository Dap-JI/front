'use client';
import classNames from 'classnames/bind';
import styles from './ProfileAllData.module.scss';
import { useState } from 'react';
import ProfileBoardDatas from '../profileBoardData';
import ProfilePostDatas from '../profilePostData';
import { PostIcon, BoardIcon } from '@/public/icon';
import { ProfilePostType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type ProfileAllDataProps = {
  lists: ProfilePostType[];
};

const ProfileAllData = ({ lists }: ProfileAllDataProps) => {
  const [selectList, setSelectList] = useState<string>('post');
  const [underlineStyle, setUnderlineStyle] = useState({ left: '0%' });

  const handleIconClick = (type: string, left: string) => {
    setSelectList(type);
    setUnderlineStyle({ left });
  };

  return (
    <div className={cn('container')}>
      <div className={cn('iconWrapper')}>
        <div
          className={cn('icon')}
          onClick={() => handleIconClick('post', '0%')}
        >
          <PostIcon width="30" height="30" />
        </div>
        <div
          className={cn('icon')}
          onClick={() => handleIconClick('board', '50%')}
        >
          <BoardIcon width="30" height="30" />
        </div>
        <div className={cn('underline')} style={underlineStyle} />
      </div>
      {lists.length === 0 ? (
        <div className={cn('empty-message')}>답지를 추가해 보세요!</div>
      ) : selectList === 'post' ? (
        <ProfilePostDatas lists={lists} />
      ) : (
        <ProfileBoardDatas />
      )}
    </div>
  );
};

export default ProfileAllData;
