import styles from './commentLists.module.scss';
import classNames from 'classnames/bind';
import { BoardCommentDetailType } from '@/src/utils/type';
import Image from 'next/image';
import LikeAction from '../../common/likeAction';
import { useState } from 'react';
import useTimeAgo from '@/src/hooks/useTimeAgo';

const cn = classNames.bind(styles);

type CommentListProps = {
  list: BoardCommentDetailType;
};

const CommentList = ({ list }: CommentListProps) => {
  const {
    User,
    board_idx,
    comment_idx,
    content,
    createdAt,
    is_like,
    like_count,
    user_idx,
  } = list;
  const [likeToggle, setLikeToggle] = useState(false);
  const [likeCount, setLikeCount] = useState(like_count);

  const timeAgo = useTimeAgo(createdAt);

  const handleLikeClick = () => {
    // likeRequest();
    console.log('좋아요~');
  };
  return (
    <div className={cn('container')}>
      <div className={cn('mainWrapper')}>
        <Image
          src={User.img}
          width="30"
          height="30"
          alt="게시물 작성자 프로필 이미지"
          className={cn('profileImage')}
        />
        <div className={cn('contentWrapper')}>
          <div className={cn('userInfo')}>
            <span>{User.nickname}</span>
            <span>{timeAgo}</span>
          </div>
          <span>{content}</span>
        </div>
      </div>
      <LikeAction
        likeCount={likeCount}
        likeToggle={likeToggle}
        onClick={handleLikeClick}
      />
    </div>
  );
};

type CommentListsProps = {
  lists: BoardCommentDetailType[];
};

const CommentLists = ({ lists }: CommentListsProps) => {
  return (
    <div>
      {lists.map((list) => (
        <CommentList key={list.comment_idx} list={list} />
      ))}
    </div>
  );
};

export default CommentLists;
