import styles from './postCommentLists.module.scss';
import classNames from 'classnames/bind';
import { PostCommentDetailType } from '@/src/utils/type';
import Image from 'next/image';
import LikeAction from '../../common/likeAction';
import { useState, memo, useRef } from 'react';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import { DeleteIcon } from '@/public/icon';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { useModal } from '@/src/hooks/useModal';
import PostRecommnetLists from '../postRecommentLists';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import Link from 'next/link';
import {
  useCommentDeleteData,
  useRecommentData,
} from '@/src/hooks/useCommentDatas';

const cn = classNames.bind(styles);

type CommentListProps = {
  list: PostCommentDetailType;
  setTagNickname: React.Dispatch<React.SetStateAction<string>>;
  setSelectId: React.Dispatch<React.SetStateAction<string>>;
};

const PostCommentList = memo(
  ({ list, setTagNickname, setSelectId }: CommentListProps) => {
    const {
      User,
      post_comment_idx,
      content,
      createdAt,
      is_like,
      like_count,
      user_idx,
      post_recomment_count,
    } = list;

    const commentRef = useRef<HTMLDivElement | null>(null); // 댓글에 대한 ref 설정

    const { mutate: postCommentDelete } = useCommentDeleteData({
      category: 'postComment',
      content_id: post_comment_idx,
      mainKey: 'postCommentDelete',
      firKey: 'postDetailComment',
      secKey: 'postDetailDatas',
    });

    const [showRecomments, setShowRecomments] = useState(false);

    //포스트 답글 조회

    const {
      data: postRecommentDatas,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useRecommentData({
      content_id: post_comment_idx,
      enabled: !!showRecomments,
      category: 'postRecomment',
      mainKey: 'postRecomment',
    });

    const postRecommentData =
      postRecommentDatas?.pages.flatMap((page) => page.postRecomments) ?? [];
    const totalCount = postRecommentDatas?.pages[0]?.meta.totalCount;
    const nextCount = postRecommentDatas?.pages[0]?.meta.take;

    //댓글 좋아요
    const { likeCount, likeToggle, handleLikeClick } = useLikeAction({
      category: 'postComments',
      content_id: post_comment_idx,
      initalLikeCount: like_count,
      initalLikeToggle: is_like,
      firQueryKeyName: 'postDetailComment',
    });

    const { myId } = useMyInfoStore();
    const { showModalHandler } = useModal();
    const isMyId = myId === user_idx;

    const timeAgo = useTimeAgo(createdAt);

    const handleCommentDelete = () => {
      const confirmAction = () => {
        postCommentDelete();
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
      setSelectId(post_comment_idx);
    };
    //닉네임 태그하면 태그네임이랑 commentid 설정

    return (
      <div className={cn('container')} ref={commentRef}>
        <div className={cn('mainWrapper')}>
          <Link href={`/profile/${user_idx}`}>
            <Image
              src={User.img || process.env.NEXT_PUBLIC_URL + '/icon/icon.png'}
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
                  <PostRecommnetLists postRecommentData={postRecommentData} />
                  {hasNextPage &&
                  totalCount !== undefined &&
                  nextCount !== undefined ? (
                    <span onClick={nextRecomments}>
                      ㅡ 답글 {totalCount - postRecommentData.length}개 더보기
                    </span>
                  ) : (
                    <span onClick={showRecommentClick}>ㅡ 답글 닫기</span>
                  )}
                </>
              ) : (
                post_recomment_count > 0 && (
                  <span onClick={showRecommentClick}>
                    ㅡ 답글 {post_recomment_count}개 보기
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
PostCommentList.displayName = 'CommentList';

type PostCommentListsProps = {
  lists: PostCommentDetailType[];
  setTagNickname: React.Dispatch<React.SetStateAction<string>>;
  setSelectId: React.Dispatch<React.SetStateAction<string>>;
};

const PostCommentLists = ({
  lists,
  setTagNickname,
  setSelectId,
}: PostCommentListsProps) => {
  return (
    <div className={cn('outerContainer')}>
      {lists.map((list) => (
        <PostCommentList
          key={list.post_comment_idx}
          list={list}
          setTagNickname={setTagNickname}
          setSelectId={setSelectId}
        />
      ))}
    </div>
  );
};

export default PostCommentLists;
