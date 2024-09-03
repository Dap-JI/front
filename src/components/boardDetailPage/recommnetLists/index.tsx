import styles from './recommnetLists.module.scss';
import classNames from 'classnames/bind';
import { RecommentType } from '@/src/utils/type';
import Image from 'next/image';
import LikeAction from '../../common/likeAction';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { DeleteIcon } from '@/public/icon';
import { useModal } from '@/src/hooks/useModal';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import { useRecommentDeleteData } from '@/src/hooks/useCommentDatas';

const cn = classNames.bind(styles);

type RecommnetListProps = {
  recomment: RecommentType;
};

const RecommnetList = ({ recomment }: RecommnetListProps) => {
  const {
    recomment_idx,
    User,
    content,
    createdAt,
    user_idx,
    like_count,
    is_like,
  } = recomment;

  const { showModalHandler } = useModal();

  const { mutate: boardReCommentDelete } = useRecommentDeleteData({
    category: 'recomment',
    content_id: recomment_idx,
    mainKey: 'boardReCommentDelete',
    firKey: 'boardRecomment',
    secKey: 'boardDetailComment',
  });

  const { likeCount, likeToggle, handleLikeClick } = useLikeAction({
    category: 'recomments',
    content_id: recomment_idx,
    initalLikeCount: like_count,
    initalLikeToggle: is_like,
    firQueryKeyName: 'boardRecomment',
  });

  const timeAgo = useTimeAgo(createdAt);
  const { myId } = useMyInfoStore();
  const isMyId = myId === user_idx;

  const handleRecommentDelete = () => {
    const confirmAction = () => {
      boardReCommentDelete();
    };
    showModalHandler('choice', '답글을 삭제하시겠어요? ', confirmAction);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('mainWrapper')}>
        <Image
          src={User.img || '/icon/icon.png'}
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

type RecommnetListsProps = {
  boardRecomments: RecommentType[];
};

const RecommnetLists = ({ boardRecomments }: RecommnetListsProps) => {
  // const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (container) {
  //     const height = container.scrollHeight;
  //     container.style.height = `${height}px`;
  //     console.log(height);
  //   }
  // }, [boardRecomments]);
  return (
    <div
      // ref={containerRef}
      className={cn('outercontainer')}
      // style={{ height: 0, overflow: 'hidden', transition: 'height 0.5s ease' }}
    >
      {boardRecomments.map((recomment) => (
        <RecommnetList key={recomment.recomment_idx} recomment={recomment} />
      ))}
    </div>
  );
};

export default RecommnetLists;
