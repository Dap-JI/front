'use client';
import classNames from 'classnames/bind';
import styles from './userProfilePage.module.scss';
import ProfileAllData from '@/src/components/profilePage/profileAllData';
import ProfileForm from '@/src/components/profilePage/profileForm';
import Header from '@/src/components/common/header';
import { fethcProfilePostDatas, useLogout } from '@/src/app/profile/api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { ProfilePostType } from '@/src/utils/type';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { AdminIcon, LogoutIcon } from '@/public/icon';
import Link from 'next/link';
import ModalChoice from '@/src/components/common/moadlChoice';
import { useModal } from '@/src/hooks/useModal';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMyInfo } from '../../auth/api';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';

const cn = classNames.bind(styles);

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

const ProfilePage = ({ params }: ProfilePageProps) => {
  const [enabled, setEnabled] = useState(false);
  const { userId } = params;
  const { data: logout, isSuccess } = useLogout(enabled);
  const { showModalHandler } = useModal();
  const router = useRouter();
  const { myId } = useMyInfoStore();
  const {
    data: profileData,
    ref,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteScroll<ProfilePostType>({
    queryKey: ['profileDatas', userId],
    fetchFunction: (page = 1) =>
      fethcProfilePostDatas({
        page,
        userId,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const name = profileData?.pages[0]?.user.nickname ?? '';
  const profileInfo = profileData?.pages[0]?.user ?? {
    nickname: '',
    img: '',
    introduce: null,
    provider: '',
  };
  const profilePosts = profileData?.pages.flatMap((page) => page.posts) ?? [];
  console.log(profileData);

  const isProfileOwner = profileData?.pages[0]?.isOwnProfile === true;
  const role = profileData?.pages[0]?.userRole === 'admin';

  const profileDataObject = {
    posts: profilePosts,
  };

  const handleLogoutClick = () => {
    const confirmAction = () => {
      setEnabled(true);
      logout;
    };
    showModalHandler('choice', '로그아웃 하시겠어요?', confirmAction);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <Header title={name}>
        <div className={cn('BtnStyles')}>
          {role && (
            <Link href={'/admin/list'}>
              <AdminIcon />
            </Link>
          )}
          {isProfileOwner && (
            <LogoutIcon className={cn('setIcon')} onClick={handleLogoutClick} />
          )}
        </div>
      </Header>
      <div className={cn('secondContainer')}>
        <ProfileForm
          lists={profileInfo}
          isProfileOwner={isProfileOwner}
          params={params}
        />
        <ProfileAllData profileData={profileDataObject} params={params} />
        <div ref={ref} />
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
      <ModalChoice />
    </div>
  );
};

export default ProfilePage;
