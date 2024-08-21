import React, { useEffect } from 'react';
import { LikeIcon, LikedIcon, PeopleLikeIcon } from '@/public/icon';
import classNames from 'classnames/bind';
import styles from './videoLike.module.scss';

const cn = classNames.bind(styles);

type VideoLikeProps = {
  likeToggle: boolean;
  onClick: () => void;
  likeCount: any;
};

const VideoLike = ({ likeToggle, onClick, likeCount }: VideoLikeProps) => {
  return (
    <div className={cn('container')}>
      {likeToggle ? (
        <LikedIcon onClick={onClick} />
      ) : (
        <LikeIcon onClick={onClick} />
      )}
      <span>{likeCount}</span>
    </div>
  );
};

export default VideoLike;
