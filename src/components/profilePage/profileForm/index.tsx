import classNames from 'classnames/bind';
import styles from './profileForm.module.scss';
import Image from 'next/image';
import { NaverIcon, KakaoIcon } from '@/public/icon/';
import { ProfileUserType, ProfilePostType } from '@/src/utils/type';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type ProfileFormProps = {
  profileInfo: ProfilePostType;
  params: {
    userId: string;
  };
};

const ProfileForm = ({ params, profileInfo }: ProfileFormProps) => {
  const { userId } = params;
  const router = useRouter();

  const renderProviderIcon = () => {
    switch (profileInfo.user.provider) {
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
              priority
            />
            <span>Dap Ji</span>
          </>
        );
      default:
        return null;
    }
  };

  const followPageClick = (userId: string, page: string) => {
    router.push(`/profile/${userId}/${page}`);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('profileWrapper')}>
        <Image
          src={profileInfo.user.img || '/icon/icon.png'}
          alt="profileImage"
          width="120"
          height="120"
          priority={true}
          className={cn('profileImage')}
        />

        <div className={cn('infoWrapper')}>
          {profileInfo.isOwnProfile ? (
            <div className={cn('btnWrapper')}>
              <div
                className={cn('oauth', `oauth-${profileInfo.user.provider}`)}
              >
                {renderProviderIcon()}
              </div>
              <div
                className={cn('profileEdit')}
                onClick={() => followPageClick(userId, 'edit')}
              >
                프로필 편집
              </div>
            </div>
          ) : (
            <div className={cn('btnWrapper')}>
              <div className={cn('oauth', `oauth-${'dapji'}`)}>
                <Image
                  src={'/icon/icon.png'}
                  width="30"
                  height="30"
                  alt="provider 기본이미지"
                  priority
                />
                <span>Dap Ji</span>
              </div>
              <div className={cn('profileEdit')}>클로잉</div>
            </div>
          )}
          <div className={cn('followWrapper')}>
            <div
              className={cn('follower')}
              onClick={() => followPageClick(userId, 'follow')}
            >
              <span>팔로워</span>
              <span>{profileInfo.followerCount}</span>
            </div>

            <div
              className={cn('following')}
              onClick={() => followPageClick(userId, 'follow')}
            >
              <span>팔로잉</span>
              <span>{profileInfo.followingCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cn('textWrapper')}>{profileInfo.user.introduce}</div>
    </div>
  );
};

export default ProfileForm;
