import classNames from 'classnames/bind';
import styles from './boardDetailForm.module.scss';
import { BoardDetailDataType } from '@/src/utils/type';
import Image from 'next/image';
import { DeleteIcon, EditIcon, CommentIcon } from '@/public/icon';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import LikeAction from '../../common/likeAction';
import { boardDeleteData } from '@/src/app/board/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useModal } from '@/src/hooks/useModal';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import Link from 'next/link';
import CommentCount from '../../common/commentCount';

const cn = classNames.bind(styles);

type BoardDetailFormProps = {
  boardDetailData: BoardDetailDataType;
};

const BoardDetailForm = ({ boardDetailData }: BoardDetailFormProps) => {
  const {
    board_idx,
    user_idx,
    title,
    content,
    category,
    createdAt,
    updatedAt,
    img,
    like_count,
    comment_count,
    User,
    is_like,
    board_like,
  } = boardDetailData;

  const { likeToggle, likeCount, handleLikeClick } = useLikeAction({
    category: 'boards',
    content_id: board_idx,
    initalLikeCount: like_count,
    initalLikeToggle: is_like,
    firQueryKeyName: 'boardDetailData',
    secQueryKeyName: 'boardListData',
  });

  const router = useRouter();
  const { showModalHandler } = useModal();

  const { mutate: boardDelete } = useMutation({
    mutationKey: ['boardDelete'],
    mutationFn: () => boardDeleteData(board_idx),
    onSuccess: () => {
      router.push(`/board`);
    },
    onError: () => {
      showModalHandler('alert', '게시글 삭제에 실패했어요');
    },
  });

  const { myId } = useMyInfoStore();
  const isMyId = myId === user_idx;

  const handleBoardDelete = () => {
    const confirmAction = () => {
      boardDelete();
    };
    showModalHandler('choice', '게시글을 삭제하시겠어요?', confirmAction);
  };

  return (
    <div className={cn('container')}>
      <header className={cn('boardDetailHeader')}>
        <div className={cn('userInfo')}>
          <Link href={`/profile/${user_idx}`}>
            <Image
              src={User.img}
              width="30"
              height="30"
              alt="게시물 작성자 프로필 이미지"
              className={cn('profileImage')}
            />
          </Link>
          <div className={cn('userText')}>
            <span>{category}</span>
            <span>{User.nickname}</span>
          </div>
        </div>
        {isMyId && (
          <div className={cn('iconWrapper')}>
            <Link href={`/board/${board_idx}/edit`}>
              <EditIcon />
            </Link>
            <DeleteIcon onClick={handleBoardDelete} />
          </div>
        )}
      </header>
      <main className={cn('mainWrapper')}>
        <div className={cn('textWrapper')}>
          <h1>{title}</h1>
          <span className={cn('contentWrapper')}>{content}</span>
        </div>
        {img.length > 0 ? (
          img.map((image, index) => (
            <Image
              key={index}
              src={image}
              width={100}
              height={100}
              alt={`게시물 이미지 ${index + 1}`}
              className={cn('boardImage')}
              priority
            />
          ))
        ) : (
          <div className={cn('noBoardImage')}></div>
        )}
      </main>
      <div className={cn('iconWrapper')}>
        <LikeAction
          likeCount={likeCount}
          likeToggle={likeToggle}
          onClick={handleLikeClick}
        />
        <CommentCount count={comment_count} />
      </div>
    </div>
  );
};

export default BoardDetailForm;
