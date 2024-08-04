import classNames from 'classnames/bind';
import styles from './profileForm.module.scss';
import Image from 'next/image';
import { NaverIcon, KakaoIcon } from '@/public/icon/';
import { ProfileUserType } from '@/src/utils/type';
import Link from 'next/link';

const cn = classNames.bind(styles);

type ProfileFormProps = {
  lists: ProfileUserType;
};

const ProfileForm = ({ lists }: ProfileFormProps) => {
  const { img, introduce, provider } = lists;

  return (
    <div className={cn('container')}>
      <div className={cn('imageWrapper')}>
        <Image
          src={img || '/icon/icon.png'}
          alt="profileImage"
          width="200"
          height="200"
          priority={true}
          className={cn('image')}
        />
      </div>
      <div className={cn('infoWrapper')}>
        <div className={cn('oauth', `oauth-${provider}`)}>
          {provider === 'kakao' ? (
            <KakaoIcon width="17" height="17" />
          ) : (
            <NaverIcon width="30" height="30" />
          )}
          <span>{provider}</span>
        </div>
        <div className={cn('profileEdit')}>프로필 편집</div>
      </div>
      <div className={cn('textWrapper')}>{introduce}</div>
    </div>
  );
};

export default ProfileForm;
