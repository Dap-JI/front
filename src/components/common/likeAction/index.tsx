import React, { useEffect } from 'react';
import { LikeIcon, LikedIcon, PeopleLikeIcon } from '@/public/icon';
import classNames from 'classnames/bind';
import styles from './likeAction.module.scss';

const cn = classNames.bind(styles);

type VideoLikeProps = {
  likeToggle: boolean;
  onClick: () => void;
  likeCount: any;
};

const LikeAction = ({ likeToggle, onClick, likeCount }: VideoLikeProps) => {
  return (
    <div className={cn('container')}>
      {likeToggle ? (
        <LikedIcon width='20' height='20' onClick={onClick} />
      ) : (
        <LikeIcon width='20' height='20' onClick={onClick} />
      )}
      <span>{likeCount}</span>
    </div>
  );
};

export default LikeAction;
