import classNames from 'classnames/bind';
import styles from './followerLists.module.scss';
import Image from 'next/image';
import { DeleteIcon } from '@/public/icon';
import { FollowerDataType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type FollowerListProps = {
  list: FollowerDataType;
};

const FollowerList = ({ list }: FollowerListProps) => {
  const { following } = list;
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
        <span>{following.nickname}</span>
      </div>
      <DeleteIcon onClick={handleFollowDelete} />
    </div>
  );
};

type FollowerListsProps = {
  lists: FollowerDataType[];
};

const FollowerLists = ({ lists }: FollowerListsProps) => {
  return (
    <div className={cn('outerContainer')}>
      {lists.map((list: FollowerDataType) => (
        <FollowerList key={list.following.user_idx} list={list} />
      ))}
    </div>
  );
};

export default FollowerLists;
