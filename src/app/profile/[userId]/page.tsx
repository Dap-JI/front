'use client';
import classNames from 'classnames/bind';
import styles from './userProfilePage.module.scss';
import ProfileAllData from '@/src/components/profilePage/profileAllData';
import ProfileForm from '@/src/components/profilePage/profileForm';
import Header from '@/src/components/common/header';
import { ProfileDatas } from '@/src/app/profile/api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { ProfileType } from '@/src/utils/type';
import NodetailData from '@/src/components/common/noDetailData';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { useEffect, useState } from 'react';

const cn = classNames.bind(styles);

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

const ProfilePage = ({ params }: ProfilePageProps) => {
  const { userId } = params;
  console.log(userId);

  const isOwnProfile = userId === undefined || userId === 'me';

  const fetchUserId = isOwnProfile
    ? 'me'
    : Array.isArray(userId)
      ? userId[0]
      : userId; // 'me'로 설정하거나 userId로 설정

  const {
    data: profileData,
    ref,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteScroll<ProfileType>({
    queryKey: ['profileDatas', fetchUserId],
    fetchFunction: (page = 1) =>
      ProfileDatas({
        page,
        userId: fetchUserId as string,
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
  const isProfileOwner = profileData?.pages[0]?.isOwnProfile ?? false;
  console.log(isProfileOwner);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <Header title={name} />
      <div className={cn('secondContainer')}>
        <ProfileForm lists={profileInfo} isProfileOwner={isProfileOwner} />
        <ProfileAllData lists={profilePosts} />
      </div>
      {isProfileOwner ? (
        <div className={cn('actions')}>
          <button>Edit Profile</button>
        </div>
      ) : (
        <div className={cn('actions')}>
          <button>Follow</button>
        </div>
      )}
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} />
    </div>
  );
};

export default ProfilePage;
