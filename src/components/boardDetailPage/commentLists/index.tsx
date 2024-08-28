import styles from './commentLists.module.scss';
import classNames from 'classnames/bind';
import { BoardCommentDetailType, BoardRecommentType } from '@/src/utils/type';
import Image from 'next/image';
import LikeAction from '../../common/likeAction';
import { useState } from 'react';
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
  useQueryClient,
} from '@tanstack/react-query';
import { useModal } from '@/src/hooks/useModal';
import RecommnetLists from '../recommnetLists';
import { useLikeAction } from '@/src/hooks/useLikeAction';

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
    recomment_count,
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

  const {
    data: boardRcommentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<BoardRecommentType>({
    queryKey: ['boardRecomment', comment_idx],
    queryFn: ({ pageParam = 1 }) =>
      boardRecommentDatas({ page: pageParam, comment_idx }),
    enabled: !!showRecomments,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNextPage) {
        return lastPage.meta.page + 1; // 다음 페이지 번호 반환
      }
      return undefined; // 더 이상 페이지가 없으면 undefined 반환
    },
    initialPageParam: 1, // 초기 페이지를 1로 설정
  });

  const boardRcomments =
    boardRcommentData?.pages.flatMap((page) => page.recomments) ?? [];

  const totalCount = boardRcommentData?.pages[0]?.meta.totalCount;
  console.log(totalCount);
  const nextCount = boardRcommentData?.pages[0]?.meta.take;

  const { likeCount, likeToggle, handleLikeClick } = useLikeAction({
    category: 'comments',
    content_id: comment_idx,
    initalLikeCount: like_count,
    initalLikeToggle: is_like,
    firQueryKeyName: 'boardDetailComment',
  });

  const { myId } = useMyInfoStore();
  const { showModalHandler } = useModal();
  const isMyId = myId === user_idx;

  const timeAgo = useTimeAgo(createdAt);

  const handleCommentDelete = () => {
    const confirmAction = () => {
      boardCommentDelete();
    };
    showModalHandler('choice', '댓글을 삭제하시겠어요?', confirmAction);
  };

  const showRecommentClick = () => {
    setShowRecomments((prev) => !prev);
  };

  const nextRecomments = () => {
    fetchNextPage();
  };

  return (
    <div className={cn('container')}>
      <div className={cn('mainWrapper')}>
        <Image
          src={User.img}
          width="30"
          height="30"
          alt="댓글 작성자 프로필 이미지"
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
          <div className={cn('replyButton')}>
            {showRecomments ? (
              <>
                <RecommnetLists boardRcomments={boardRcomments} />
                {hasNextPage &&
                totalCount !== undefined &&
                nextCount !== undefined ? (
                  <span onClick={nextRecomments}>
                    ㅡ 답글 {totalCount - boardRcomments.length}개 더보기
                  </span>
                ) : (
                  <span onClick={showRecommentClick}>ㅡ 답글 닫기</span>
                )}
              </>
            ) : (
              recomment_count > 0 && (
                <span onClick={showRecommentClick}>
                  ㅡ 답글 {recomment_count}개 보기
                </span>
              )
            )}
          </div>
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
