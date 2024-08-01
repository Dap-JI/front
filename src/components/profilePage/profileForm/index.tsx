import { PostIcon, ProfileAddIcon, BoardIcon } from '@/public/icon/';
import classNames from 'classnames/bind';
import styles from './profileForm.module.scss';
import Image from 'next/image';
import { NaverIcon, KakaoIcon } from '@/public/icon/';

const cn = classNames.bind(styles);

const ProfileForm = () => {
  const oauth = 'kakao';
  const content =
    ' 안녕하세요 안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요 안녕하세요';

  return (
    <div className={cn('container')}>
      <div className={cn('imageWrapper')}>
        <Image
          src="/icon/pro.jpg"
          alt="profileImage"
          priority
          width="200"
          height="200"
          className={cn('image')}
        />
      </div>
      <div className={cn('infoWrapper')}>
        <div className={cn('oauth', `oauth-${oauth}`)}>
          {oauth === 'kakao' ? (
            <KakaoIcon width="17" height="17" />
          ) : (
            <NaverIcon width="30" height="30" />
          )}
          <span>{oauth}</span>
        </div>
        <div className={cn('profileEdit')}>프로필 편집</div>
      </div>
      <div className={cn('textWrapper')}>{content}</div>
    </div>
  );
};

export default ProfileForm;
