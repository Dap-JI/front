import { PostIcon, ProfileAddIcon, BoardIcon } from '@/public/icon/';
import classNames from 'classnames/bind';
import styles from './profileForm.module.scss';
import Image from 'next/image';
const cn = classNames.bind(styles);

const ProfileForm = () => {
  return (
    <div className={cn('container')}>
      <div>이미지 사진</div>
      <div className={cn('infoWrapper')}>
        <div>카카오 또는 네이버</div>
        <div>프로필 편집</div>
      </div>
      <div>안녕하세요 안녕하세요 안녕하세요 안녕하세요 </div>
    </div>
  );
};

export default ProfileForm;
