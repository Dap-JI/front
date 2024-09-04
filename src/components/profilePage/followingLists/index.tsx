import classNames from 'classnames/bind';
import styles from './followingLists.module.scss';
import Image from 'next/image';
import { DeleteIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type FollowingListProps = {
  list: any;
};

const FollowingList = ({ list }: FollowingListProps) => {
  const {
    createdAt,
    follow_idx,
    follower,
    follower_idx,
    following_idx,
    updatedAt,
  } = list;
  const handleFollowDelete = () => {
    console.log('팔로워삭제');
  };
  return (
    <div className={cn('container')}>
      <div className={cn('infoWrapper')}>
        <Image
          src="/icon/icon.png"
          width={50}
          height={50}
          className={cn('profileImage')}
          alt="팔로우 페이지 프로필 이미지"
          priority
        />
        <span>{follower.nickname}</span>
      </div>
      <DeleteIcon onClick={handleFollowDelete} />
    </div>
  );
};

type FollowingListsProps = {
  lists: any;
};

const FollowingLists = ({ lists }: FollowingListsProps) => {
  console.log('following===>', lists);

  return (
    <div className={cn('outerContainer')}>
      {lists.map((list: any) => (
        <FollowingList key={list.follow_idx} list={list} />
      ))}
    </div>
  );
};

export default FollowingLists;
