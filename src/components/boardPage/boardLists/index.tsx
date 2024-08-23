import styles from './boardLists.module.scss';
import classNames from 'classnames/bind';
import { BoardListDataType } from '@/src/utils/type';
import { CommentIcon, LikeIcon } from '@/public/icon';
import Image from 'next/image';
import useTruncateString from '@/src/hooks/useTruncateString';
import LinkPreview from '@/src/components/common/linkPreview';
import useTimeAgo from '@/src/hooks/useTimeAgo';

const cn = classNames.bind(styles);

type BoardListProps = {
  list: BoardListDataType;
};

const BoardList = ({ list }: BoardListProps) => {
  const {
    User,
    category,
    like_count,
    comment_count,
    title,
    content,
    // linkPreview,
    img,
    createAt,
  } = list;
  const timeAgo = useTimeAgo(createAt);
  //시간대 표시

  const truncateString = useTruncateString();
  //글자수 제한한
  const imageLeghth = img.length;
  //이미지 갯수 표시

  return (
    <article className={cn('container')}>
      <div className={cn('containerWrapper')}>
        <section className={cn('contentWrapper')}>
          <header className={cn('userInfo')}>
            <Image
              src={User.img}
              width={30}
              height={30}
              alt="유저 이미지"
              className={cn('profileImage')}
            />
            <div className={cn('dateWrapper')}>
              <span className={cn('category')}>{category}</span>
              <div className={cn('dataInfo')}>
                <span>{User.nickname}</span>
                <span>{timeAgo}</span>
              </div>
            </div>
          </header>
          <h1>{truncateString(title, 15)}</h1>
          <span className={cn('content')}>{truncateString(content, 50)}</span>
        </section>
        <section className={cn('boardImageWrapper')}>
          {img.length > 0 ? (
            <>
              <Image
                src={img[0]}
                width="100"
                height="100"
                alt="게시물 이미지"
                className={cn('boardImage')}
              />
              <span className={cn('imageLength')}>+ {imageLeghth}</span>
            </>
          ) : (
            <div className={cn('noBoardImage')}></div>
          )}
          <div className={cn('iconWrapper')}>
            <div className={cn('like')}>
              <LikeIcon width="20" height="20" />
              <span>{comment_count}</span>
            </div>
            <div className={cn('comment')}>
              <CommentIcon width="20" height="20" />
              <span>{like_count}</span>
            </div>
          </div>
        </section>
      </div>
      {/* {linkPreview && (linkPreview.img || linkPreview.title) && (
        <LinkPreview linkPreview={linkPreview} />
      )} */}
    </article>
  );
};

type BoardListsProps = {
  lists: BoardListDataType[];
};

const BoardLists = ({ lists }: BoardListsProps) => {
  return (
    <div className={cn('outerContainer')}>
      {lists.map((list: BoardListDataType) => (
        <BoardList key={list.board_idx} list={list} />
      ))}
    </div>
  );
};

export default BoardLists;
