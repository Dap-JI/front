import styles from './recommnetLists.module.scss';
import classNames from 'classnames/bind';
import { RecommentType } from '@/src/utils/type';
import Image from 'next/image';
import LikeAction from '../../common/likeAction';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { DeleteIcon } from '@/public/icon';
import { boardReommentDeleteData } from '@/src/app/board/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useModal } from '@/src/hooks/useModal';
import { useLikeAction } from '@/src/hooks/useLikeAction';

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
    comment_idx,
    user_idx,
    like_count,
    is_like,
  } = recomment;

  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  const { mutate: boardReCommentDelete } = useMutation({
    mutationKey: ['boardReCommentDelete'],
    mutationFn: () => boardReommentDeleteData(recomment_idx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardRecomment'] });
    },
    onError: () => {
      showModalHandler('alert', '댓글 삭제에 실패했어요');
    },
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

  const handleCommentDelete = () => {
    const confirmAction = () => {
      boardReCommentDelete();
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
                onClick={handleCommentDelete}
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
  boardRcomments: RecommentType[];
};

const RecommnetLists = ({ boardRcomments }: RecommnetListsProps) => {
  return (
    <div>
      {boardRcomments.map((recomment) => (
        <RecommnetList key={recomment.recomment_idx} recomment={recomment} />
      ))}
    </div>
  );
};

export default RecommnetLists;
