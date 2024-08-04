import classNames from 'classnames/bind';
import styles from './profilePostData.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { ProfilePostType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type ProfilePostDataProps = {
  list: ProfilePostType;
};
//api/posts/${postsidx}

const ProfilePostData = ({ list }: ProfilePostDataProps) => {
  const { thumbnailUrl, post_idx } = list;
  return (
    <div className={cn('container')}>
      {/* <Link href={`/api/posts/${post_idx}`}> */}
        <Image
          src={thumbnailUrl || '/icon/icon.png'}
          alt="postImage"
          width="120"
          height="120"
        />
      {/* </Link> */}
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
