import styles from './commentLists.module.scss';
import classNames from 'classnames/bind';
import { BoardCommentDetailType } from '@/src/utils/type';
import Image from 'next/image';
import LikeAction from '../../common/likeAction';
import { useState, useRef, useEffect } from 'react';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import { DeleteIcon } from '@/public/icon';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { boardCommentDeleteData } from '@/src/app/board/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from '@/src/hooks/useModal';

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

  const queryClient = useQueryClient();
  const { mutate: boardCommentDelete } = useMutation({
    mutationKey: ['boardCommentDelete'],
    mutationFn: () => boardCommentDeleteData(comment_idx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardDetaiCommentlData'] });
    },
    onError: () => {
      showModalHandler('alert', '댓글 삭제에 실패했어요');
    },
  });

  const [likeToggle, setLikeToggle] = useState(false);
  const [likeCount, setLikeCount] = useState(like_count);
  const { myId } = useMyInfoStore();
  const { showModalHandler } = useModal();
  const isMyId = myId === user_idx;

  const timeAgo = useTimeAgo(createdAt);

  const handleLikeClick = () => {
    // likeRequest();
  };

  const handleCommentDelete = () => {
    const confirmAction = () => {
      boardCommentDelete();
    };
    showModalHandler('choice', '댓글을 삭제하시겠어요?', confirmAction);
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
            {isMyId && (
              <DeleteIcon
                width="12"
                height="12"
                className={cn('deleteIcon')}
                onClick={handleCommentDelete}
              />
            )}
          </div>
          <span>{content}</span>
          <span className={cn('replyButton')}>ㅡ 답글 달기</span>
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
  // const containerRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   // 댓글 목록이 업데이트된 후 스크롤을 하단으로 이동
  //   if (containerRef.current) {
  //     containerRef.current.scrollTo({
  //       top: containerRef.current.scrollHeight,
  //       behavior: 'smooth', // 부드러운 스크롤을 위해
  //     });
  //   }
  // }, [lists]); // 댓글 리스트가 변경될 때마다 스크롤 이동

  return (
    // <div className={cn('outerContainer')} ref={containerRef}>
    <div className={cn('outerContainer')}>
      {lists.map((list) => (
        <CommentList key={list.comment_idx} list={list} />
      ))}
    </div>
  );
};

export default CommentLists;
