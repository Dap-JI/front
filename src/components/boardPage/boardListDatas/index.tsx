import styles from './boardListDatas.module.scss';
import classNames from 'classnames/bind';
import { BoardListDataType } from '@/src/utils/dummy';
import { CommentIcon, LikeIcon } from '@/public/icon';
import Image from 'next/image';
import useTruncateString from '@/src/hooks/useTruncateString';

const cn = classNames.bind(styles);

type BoardListDataProps = {
  list: BoardListDataType;
};

const BoardListData = ({ list }: BoardListDataProps) => {
  const {
    user,
    category,
    likeCount,
    commentCount,
    title,
    content,
    linkPreview,
    boardImg,
  } = list;

  const truncateString = useTruncateString();
  //글자수 제한한
  const imageLeghth = boardImg.length;
  //이미지 갯수 표시

  return (
    <div className={cn('container')}>
      <div className={cn('contentWrapper')}>
        <div className={cn('userInfo')}>
          <Image
            src={user.img}
            width={30}
            height={30}
            alt="유저 이미지"
            className={cn('profileImage')}
          />

          <div className={cn('dateWrapper')}>
            <span className={cn('category')}>{category}</span>
            <div className={cn('dataInfo')}>
              <span>{user.nickname}</span>
              <span>10분 전</span>
            </div>
          </div>
        </div>

        <h1>{truncateString(title, 10)}</h1>
        <span>{truncateString(content, 50)}</span>
      </div>

      <div className={cn('boardImageWrapper')}>
        <Image
          src={boardImg[0]}
          width="100"
          height="100"
          alt="게시물 이미지"
          className={cn('boardImage')}
        />
        <span className={cn('imageLength')}>+ {imageLeghth}</span>

        <div className={cn('iconWrapper')}>
          <div className={cn('like')}>
            <LikeIcon width="20" height="20" />
            <span>{commentCount}</span>
          </div>

          <div className={cn('comment')}>
            <CommentIcon width="20" height="20" />
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

type BoardListDatasProps = {
  lists: BoardListDataType[];
};

const BoardListDatas = ({ lists }: BoardListDatasProps) => {
  return (
    <div className={cn('outerContainer')}>
      {lists.map((list: BoardListDataType) => (
        <BoardListData key={list.board_idx} list={list} />
      ))}
    </div>
  );
};

export default BoardListDatas;
