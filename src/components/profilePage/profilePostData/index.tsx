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

  const imageUrl =
    Array.isArray(thumbnailUrl) && thumbnailUrl.length > 0
      ? thumbnailUrl[0]
      : '/icon/icon.png'; // 배열이 없거나 빈 배열일 경우 기본 이미지 설정

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
