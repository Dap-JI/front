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
  const { img, introduce, provider, nickname } = lists;
  const { userId } = params;

  const renderProviderIcon = () => {
    switch (provider) {
      case 'kakao':
        return (
          <>
            <KakaoIcon width="17" height="17" />
            <span>Kakao</span>
          </>
        );
      case 'naver':
        return (
          <>
            <NaverIcon width="30" height="30" />
            <span>Naver</span>
          </>
        );
      case 'dapji':
        return (
          <>
            <Image
              src={'/icon/icon.png'}
              width="30"
              height="30"
              alt="provider 기본이미지"
            />
            <span>Dap Ji</span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('container')}>
      <div className={cn('profileWrapper')}>
        <Image
          src={img || '/icon/icon.png'}
          alt="profileImage"
          width="120"
          height="120"
          priority={true}
          className={cn('profileImage')}
        />

        <div className={cn('infoWrapper')}>
          {isProfileOwner && (
            <div className={cn('btnWrapper')}>
              <div className={cn('oauth', `oauth-${provider}`)}>
                {renderProviderIcon()}
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

          <div className={cn('followWrapper')}>
            <div className={cn('follower')}>
              <span>팔로워</span>
              <span>122</span>
            </div>
            <div className={cn('following')}>
              <span>팔로잉</span>
              <span>122</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cn('textWrapper')}>{introduce}</div>
    </div>
  );
};

export default ProfileForm;
