import classNames from 'classnames/bind';
import styles from './followerLists.module.scss';
import Image from 'next/image';
import { DeleteIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type FollowerListProps = {
  list: any;
};

const FollowerList = ({ list }: FollowerListProps) => {
  const { createdAt, follow_idx, following, following_idx, updatedAt } = list;
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
  lists: any;
};

const FollowerLists = ({ lists }: FollowerListsProps) => {
  return (
    <div className={cn('outerContainer')}>
      {lists.map((list: any) => (
        <FollowerList key={list.follow_idx} list={list} />
      ))}
    </div>
  );
};

export default FollowerLists;
