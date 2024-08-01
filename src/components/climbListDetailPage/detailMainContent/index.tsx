'use client';
import classNames from 'classnames/bind';
import styles from './detailMainContent.module.scss';
import { DoubleRightArrowIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import {
  DetailMainContentProps,
  DetailType,
  DetailMainContentListProps,
} from '@/src/utils/type';
import { useState } from 'react';
import LoadingSpinner from '@/src/components/loadingSpinner';

const cn = classNames.bind(styles);

const DetailMainContent = ({ list }: DetailMainContentProps) => {
  const { color, User, clearday, content, post_idx, media, gym_idx } = list;
  const [isUpLoading, setIsUpLoading] = useState(false);

  const router = useRouter();

  const postDetailPage = () => {
    router.push(`/climbList/${gym_idx}/${post_idx}`);
  };

  const deleteT = (date: string | null) => date?.split('T')[0];

  return (
    <div className={cn('container')}>
      <div className={cn('infoWrapper')}>
        <div className={cn('color', `color-${color}`)} />
        <span>{deleteT(clearday)}</span>
        <span>{User.nickname}</span>
        <DoubleRightArrowIcon onClick={postDetailPage} />
      </div>
      <div className={cn('videoWrapper')}>
        <video src={media} autoPlay muted controls playsInline />
      </div>
      <p>{content}</p>
    </div>
  );
};

const DetailMainContentList = ({ lists }: DetailMainContentListProps) => {
  return (
    <div className={cn('listContainer')}>
      {lists?.map((list: DetailType) => (
        <DetailMainContent key={list.post_idx} list={list} />
      ))}
    </div>
  );
};

export default DetailMainContentList;
