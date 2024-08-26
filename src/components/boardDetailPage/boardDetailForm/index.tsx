import classNames from 'classnames/bind';
import styles from './boardDetailForm.module.scss';
import { BoardCommentType, BoardDetailDataType } from '@/src/utils/type';
import Image from 'next/image';
import { DeleteIcon, EditIcon } from '@/public/icon';
import { useMyInfo } from '@/src/app/auth/api';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';

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

  const { myId } = useMyInfoStore();
  const isMyId = myId === user_idx;

  return (
    <div className={cn('container')}>
      <header className={cn('boardDetailHeader')}>
        <div className={cn('userInfo')}>
          <Image
            src={User.img}
            width="30"
            height="30"
            alt="게시물 작성자 프로필 이미지"
            className={cn('profileImage')}
          />
          <div className={cn('userText')}>
            <span>{category}</span>
            <span>{User.nickname}</span>
          </div>
        </div>
        {isMyId && (
          <div className={cn('iconWrapper')}>
            <EditIcon className={cn('editIcon')} />
            <DeleteIcon />
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
      <div></div>
    </div>
  );
};

export default BoardDetailForm;
