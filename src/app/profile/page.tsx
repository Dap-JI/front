'use client';
import classNames from 'classnames/bind';
import styles from './profilePage.module.scss';
import ProfileAllData from '@/src/components/profilePage/profileAllData';
import ProfileForm from '@/src/components/profilePage/profileForm';
import Header from '@/src/components/common/header';
import { ProfileDatas } from '@/src/app/profile/api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { ProfileType } from '@/src/utils/type';
import NodetailData from '@/src/components/common/noDetailData';
import LoadingSpinner from '@/src/components/common/loadingSpinner';

const cn = classNames.bind(styles);

const ProfilePage = () => {
  const userId = 5; // 현재 로그인한 사용자의 ID를 'me'로 설정

  const {
    data: profileData,
    ref,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteScroll<ProfileType>({
    queryKey: ['profileDatas', userId],
    fetchFunction: (page = 1) =>
      ProfileDatas({
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
      <div className={cn('actions')}>
        <button>Edit Profile</button>
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} />
    </div>
  );
};

export default ProfilePage;
