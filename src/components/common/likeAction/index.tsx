import React from 'react';
import { LikeIcon, LikedIcon, PeopleLikeIcon } from '@/public/icon';
import classNames from 'classnames/bind';
import styles from './likeAction.module.scss';

const cn = classNames.bind(styles);

type LikeActionProps = {
  likeToggle: boolean;
  onClick: (e: React.MouseEvent) => void;
  likeCount: any;
};

const LikeAction = ({ likeToggle, onClick, likeCount }: LikeActionProps) => {
  return (
    <div className={cn('container')}>
      {likeToggle ? (
        <LikedIcon width="20" height="20" onClick={onClick} />
      ) : (
        <LikeIcon width="20" height="20" onClick={onClick} />
      )}
      <span className={cn('likeCount')}>{likeCount}</span>
    </div>
  );
};

export default LikeAction;
