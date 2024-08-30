import styles from './commentLists.module.scss';
import classNames from 'classnames/bind';
import { BoardCommentDetailType } from '@/src/utils/type';
import Image from 'next/image';
import LikeAction from '../../common/likeAction';
import { useState, memo, useRef } from 'react';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import { DeleteIcon } from '@/public/icon';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { useModal } from '@/src/hooks/useModal';
import RecommnetLists from '../recommnetLists';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import Link from 'next/link';
import {
  useCommentDeleteData,
  useRecommentData,
} from '@/src/hooks/useCommentDatas';

const cn = classNames.bind(styles);

type CommentListProps = {
  list: BoardCommentDetailType;
  setTagNickname: React.Dispatch<React.SetStateAction<string>>;
  setSelectId: React.Dispatch<React.SetStateAction<string>>;
};

const CommentList = memo(
  ({ list, setTagNickname, setSelectId }: CommentListProps) => {
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

    const commentRef = useRef<HTMLDivElement | null>(null); // 댓글에 대한 ref 설정

    const { mutate: boardCommentDelete } = useCommentDeleteData({
      category: 'comment',
      content_id: comment_idx,
      mainKey: 'boardCommentDelete',
      firKey: 'boardDetailComment',
    });

    const [showRecomments, setShowRecomments] = useState(false);

    const {
      data: boardRecommentData,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useRecommentData({
      content_id: comment_idx,
      enabled: !!showRecomments,
      category: 'recomment',
      mainKey: 'boardRecomment',
    });

    const boardRecomments =
      boardRecommentData?.pages.flatMap((page) => page.recomments) ?? [];

    const totalCount = boardRecommentData?.pages[0]?.meta.totalCount;
    const nextCount = boardRecommentData?.pages[0]?.meta.take;

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
    //댓글 삭제
    const showRecommentClick = () => {
      if (showRecomments) {
        // 답글을 닫을 때 댓글로 스크롤 이동
        if (commentRef.current) {
          commentRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
      setShowRecomments((prev) => !prev);
    };

    //답글보기

    const nextRecomments = () => {
      fetchNextPage();
    };

    //답글 더 있으면 보여주기

    const tagNicknameClick = () => {
      setTagNickname(`@${User.nickname}`);
      setSelectId(comment_idx);
    };
    //닉네임 태그하면 태그네임이랑 commentid 설정

    return (
      <div className={cn('container')} ref={commentRef}>
        <div className={cn('mainWrapper')}>
          <Link href={`/profile/${user_idx}`}>
            <Image
              src={User.img}
              width="30"
              height="30"
              alt="댓글 작성자 프로필 이미지"
              className={cn('profileImage')}
            />
          </Link>
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
            <span className={cn('replyButton')} onClick={tagNicknameClick}>
              답글 달기
            </span>
            <div className={cn('replyButton')}>
              {showRecomments ? (
                <>
                  <RecommnetLists boardRecomments={boardRecomments} />
                  {hasNextPage &&
                  totalCount !== undefined &&
                  nextCount !== undefined ? (
                    <span onClick={nextRecomments}>
                      ㅡ 답글 {totalCount - boardRecomments.length}개 더보기
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
  },
);
CommentList.displayName = 'CommentList';

type CommentListsProps = {
  lists: BoardCommentDetailType[];
  setTagNickname: React.Dispatch<React.SetStateAction<string>>;
  setSelectId: React.Dispatch<React.SetStateAction<string>>;
};

const CommentLists = ({
  lists,
  setTagNickname,
  setSelectId,
}: CommentListsProps) => {
  return (
    <div className={cn('outerContainer')}>
      {lists.map((list) => (
        <CommentList
          key={list.comment_idx}
          list={list}
          setTagNickname={setTagNickname}
          setSelectId={setSelectId}
        />
      ))}
    </div>
  );
};

export default CommentLists;
