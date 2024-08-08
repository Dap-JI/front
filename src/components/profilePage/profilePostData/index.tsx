import classNames from 'classnames/bind';
import styles from './profilePostData.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { ProfilePostType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type ProfilePostDataProps = {
  list: ProfilePostType;
};

const ProfilePostData = ({ list }: ProfilePostDataProps) => {
  const { thumbnailUrl, post_idx, gym_idx } = list;
  return (
    <div className={cn('container')}>
      <Link href={`/climbList/${gym_idx}/${post_idx}`}>
        <Image
          src={thumbnailUrl || '/icon/icon.png'}
          alt="postImage"
          width="150"
          height="150"
          className={cn('image')}
        />
      </Link>
    </div>
  );
};

type ProfilePostDatasProps = {
  lists: ProfilePostType[];
};

const ProfilePostDatas = ({ lists }: ProfilePostDatasProps) => {
  return (
    <div className={cn('outerContainer')}>
      {lists.map((list: ProfilePostType) => (
        <ProfilePostData key={list.post_idx} list={list} />
      ))}
    </div>
  );
};

export default ProfilePostDatas;
