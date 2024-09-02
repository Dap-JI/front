import classNames from 'classnames/bind';
import styles from './profileBoardData.module.scss';
import { LikeIcon } from '@/public/icon';
import { ProfileBoardDetailType } from '@/src/utils/type';
import CommentCount from '../../common/commentCount';
import { useRouter } from 'next/navigation';
import { fetchProfileBoardDatas } from '@/src/app/profile/api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { ProfileBoardType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type ProfileBoardDataProps = {
  list: ProfileBoardDetailType;
};

const ProfileBoardData = ({ list }: ProfileBoardDataProps) => {
  const { title, category, created_at, like_count, comment_count, board_idx } =
    list;
  const deleteT = (date: string | null) => date?.split('T')[0];
  const router = useRouter();

  const boardClick = () => {
    router.push(`/board/${board_idx}`);
  };
  
  return (
    <div className={cn('container')} onClick={boardClick}>
      <div className={cn('dot')}>🔵</div>
      <div className={cn('mainContent')}>
        <h1 className={cn('title')}>{title}</h1>
        <div className={cn('infoWrapper')}>
          <span>{category}</span>
          <span>{deleteT(created_at)}</span>
        </div>
      </div>
      <div className={cn('iconWrapper')}>
        <div className={cn('like')}>
          <LikeIcon width="20" height="20" />
          <span>{like_count}</span>
        </div>
        <CommentCount count={comment_count} />
      </div>
    </div>
  );
};

type ProfileBoardDatasProps = {
  params: {
    userId: string;
  };
};

const ProfileBoardDatas = ({ params }: ProfileBoardDatasProps) => {
  const { userId } = params;

  const { data: profileBoardData, ref } = useInfiniteScroll<ProfileBoardType>({
    queryKey: ['profileBoardData', userId],
    fetchFunction: (page = 1) =>
      fetchProfileBoardDatas({
        page,
        userId,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });
  const profileBoards =
    profileBoardData?.pages.flatMap((page) => page.boards) ?? [];
  return (
    <div className={cn('outerContainer')}>
      {profileBoards.map((list) => (
        <ProfileBoardData key={list.board_idx} list={list} />
      ))}
      <div ref={ref} />
    </div>
  );
};

export default ProfileBoardDatas;
