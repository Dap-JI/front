import classNames from 'classnames/bind';
import styles from './followingLists.module.scss';
import Image from 'next/image';
import { DeleteIcon } from '@/public/icon';
import { FollowingDataType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type FollowingListProps = {
  list: FollowingDataType;
};

const FollowingList = ({ list }: FollowingListProps) => {
  const { follower } = list;
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
  lists: FollowingDataType[];
};

const FollowingLists = ({ lists }: FollowingListsProps) => {
  return (
    <div className={cn('outerContainer')}>
      {lists.map((list: FollowingDataType) => (
        <FollowingList key={list.follower.user_idx} list={list} />
      ))}
    </div>
  );
};

export default FollowingLists;
