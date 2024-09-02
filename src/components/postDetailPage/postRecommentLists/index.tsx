import styles from './postRecommentLists.module.scss';
import classNames from 'classnames/bind';
import { PostRecommentDetailType } from '@/src/utils/type';
import Image from 'next/image';
import LikeAction from '../../common/likeAction';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { DeleteIcon } from '@/public/icon';
import { useModal } from '@/src/hooks/useModal';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import { useRecommentDeleteData } from '@/src/hooks/useCommentDatas';

const cn = classNames.bind(styles);

type PostRecommnetListProps = {
  postRecomment: PostRecommentDetailType;
};

const PostRecommnetList = ({ postRecomment }: PostRecommnetListProps) => {
  const {
    post_recomment_idx,
    User,
    content,
    createdAt,
    user_idx,
    like_count,
    is_like,
  } = postRecomment;

  const { showModalHandler } = useModal();

  //답글 삭제
  const { mutate: postReCommentDelete } = useRecommentDeleteData({
    category: 'postRecomment',
    content_id: post_recomment_idx,
    mainKey: 'postRecommentDelete',
    firKey: 'postRecomment',
    secKey: 'postDetailComment',
  });

  //답글 좋아요
  const { likeCount, likeToggle, handleLikeClick } = useLikeAction({
    category: 'postRecomments',
    content_id: post_recomment_idx,
    initalLikeCount: like_count,
    initalLikeToggle: is_like,
    firQueryKeyName: 'postRecomment',
  });

  const timeAgo = useTimeAgo(createdAt);
  const { myId } = useMyInfoStore();
  const isMyId = myId === user_idx;

  //답글 삭제 버튼
  const handleRecommentDelete = () => {
    const confirmAction = () => {
      postReCommentDelete();
    };
    showModalHandler('choice', '답글을 삭제하시겠어요? ', confirmAction);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('mainWrapper')}>
        <Image
          src={User.img}
          width="30"
          height="30"
          alt="답글 유저 이미지"
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
                onClick={handleRecommentDelete}
              />
            )}
          </div>
          <span>{content}</span>
        </div>
      </div>
      <div className={cn('likeAction')}>
        <LikeAction
          likeCount={likeCount}
          likeToggle={likeToggle}
          onClick={handleLikeClick}
        />
      </div>
    </div>
  );
};

type PostRecommnetListsProps = {
  postRecommentData: PostRecommentDetailType[];
};

const PostRecommnetLists = ({ postRecommentData }: PostRecommnetListsProps) => {
  // const containerRef = useRef<HTMLDivElement>(null);
  console.log(postRecommentData);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (container) {
  //     const height = container.scrollHeight;
  //     container.style.height = `${height}px`;
  //     console.log(height);
  //   }
  // }, [postRecommentData]);
  return (
    <div
      // ref={containerRef}
      className={cn('outercontainer')}
      // style={{ height: 0, overflow: 'hidden', transition: 'height 0.5s ease' }}
    >
      {postRecommentData.map((postRecomment) => (
        <PostRecommnetList
          key={postRecomment.post_recomment_idx}
          postRecomment={postRecomment}
        />
      ))}
    </div>
  );
};

export default PostRecommnetLists;
