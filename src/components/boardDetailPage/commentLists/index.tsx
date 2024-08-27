// 'use client';
import styles from './commentLists.module.scss';
import classNames from 'classnames/bind';
import { BoardCommentDetailType, BoardRecommentType } from '@/src/utils/type';
import Image from 'next/image';
import LikeAction from '../../common/likeAction';
import { useState, useRef, useEffect } from 'react';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import { DeleteIcon } from '@/public/icon';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import {
  boardCommentDeleteData,
  boardRecommentDatas,
} from '@/src/app/board/api';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useModal } from '@/src/hooks/useModal';
import RecommnetLists from '../recommnetLists';

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
  //댓글 삭제
  const { mutate: boardCommentDelete } = useMutation({
    mutationKey: ['boardCommentDelete'],
    mutationFn: () => boardCommentDeleteData(comment_idx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardDetailCommentlData'] });
    },
    onError: () => {
      showModalHandler('alert', '댓글 삭제에 실패했어요');
    },
  });

  const [showRecomments, setShowRecomments] = useState(false);

  //대댓글 조회
  // const { data: boardRcommentData } = useQuery<BoardRecommentType>({
  //   queryKey: ['boardRecomment'],
  //   queryFn: () => boardRecommentDatas({ page, comment_idx }),
  //   // enabled: !!showRecomments,
  // });

  const {
    data: boardRcommentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<BoardRecommentType>({
    queryKey: ['boardRecomment', comment_idx],
    queryFn: ({ pageParam = 1 }) =>
      boardRecommentDatas({ page: pageParam, comment_idx }),
    // enabled: !!showRecomments,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNextPage) {
        return lastPage.meta.page + 1; // 다음 페이지 번호 반환
      }
      return undefined; // 더 이상 페이지가 없으면 undefined 반환
    },
    initialPageParam: 1, // 초기 페이지를 1로 설정
  });

  console.log(boardRcommentData);
  const boardRcomments = boardRcommentData ?? [];
  // console.log(boardRcommentData);

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

  const showRecommentClick = () => {
    setShowRecomments((prev) => !prev);
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
          <span className={cn('replyButton')}>답글 달기</span>
          <span className={cn('replyButton')} onClick={showRecommentClick}>
            {showRecomments ? (
              <>
                {/* <RecommnetLists boardRcomments={boardRcomments} /> */}
                <span>ㅡ 답글 몇개 더보기</span>
              </>
            ) : (
              'ㅡ 답글 보기 '
            )}
          </span>
          {/* {showRecomments && <RecommnetLists boardRcomments={boardRcomments} />} */}
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
    <div className={cn('outerContainer')}>
      {lists.map((list) => (
        <CommentList key={list.comment_idx} list={list} />
      ))}
    </div>
  );
};

export default CommentLists;
