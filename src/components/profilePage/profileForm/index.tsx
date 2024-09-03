import classNames from 'classnames/bind';
import styles from './profileForm.module.scss';
import Image from 'next/image';
import { NaverIcon, KakaoIcon } from '@/public/icon/';
import { ProfileUserType } from '@/src/utils/type';
import Link from 'next/link';

const cn = classNames.bind(styles);

type ProfileFormProps = {
  lists: ProfileUserType;
  isProfileOwner: boolean;
  params: {
    userId: string;
  };
};

const ProfileForm = ({ lists, isProfileOwner, params }: ProfileFormProps) => {
  const { img, introduce, provider } = lists;
  const { userId } = params;

  const renderProviderIcon = () => {
    switch (provider) {
      case 'kakao':
        return <KakaoIcon width="17" height="17" />;
      case 'naver':
        return <NaverIcon width="30" height="30" />;
      case 'dapji':
        return (
          <Image
            src={'/icon/icon.png'}
            width="30"
            height="30"
            alt="provider 기본이미지"
          />
        );
      default:
        return null;
    }
  };

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
      {isProfileOwner && (
        <div className={cn('infoWrapper')}>
          <div className={cn('oauth', `oauth-${provider}`)}>
            {renderProviderIcon()}
            <span>{provider}</span>
          </div>
          <div className={cn('profileEdit')}>
            <Link
              href={`/profile/${userId}/edit`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              프로필 편집
            </Link>
          </div>
        </div>
      )}
      <div className={cn('textWrapper')}>{introduce}</div>
    </div>
  );
};

export default ProfileForm;
