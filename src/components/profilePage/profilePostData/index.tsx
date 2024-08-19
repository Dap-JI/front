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

  // thumbnailUrl이 배열일 경우 0번째 요소를 사용하고, 배열이 아니면 기본 아이콘을 사용
  const imageUrl =
    Array.isArray(thumbnailUrl) && thumbnailUrl.length > 0
      ? thumbnailUrl[0]
      : '/icon/icon.png';

  return (
    <div className={cn('container')}>
      <Link href={`/climbList/${gym_idx}/${post_idx}`}>
        <Image
          src={imageUrl}
          alt="postImage"
          width="165"
          height="165"
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
