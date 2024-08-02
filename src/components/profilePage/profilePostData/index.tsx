import classNames from 'classnames/bind';
import styles from './profilePostData.module.scss';
import Image from 'next/image';
import { PostDatas } from '@/src/utils/dummy';
const cn = classNames.bind(styles);

type PostType = {
  thumbnail_idx: number;
  thumbnail: string;
};

type ProfilePostDataProps = {
  list: PostType;
};

const ProfilePostData = ({ list }: ProfilePostDataProps) => {
  const { thumbnail } = list;
  return (
    <div className={cn('container')}>
      <Image src={thumbnail} alt="postImage" width="120" height="120" />
    </div>
  );
};

const ProfilePostDatas = ({ lists }: any) => {
  return (
    <div className={cn('outerContainer')}>
      {PostDatas.map((list) => (
        <ProfilePostData key={list.thumbnail_idx} list={list} />
      ))}
    </div>
  );
};

export default ProfilePostDatas;
