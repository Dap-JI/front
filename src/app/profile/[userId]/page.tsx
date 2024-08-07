'use client';
import classNames from 'classnames/bind';
import styles from './userProfilePage.module.scss';
import ProfileAllData from '@/src/components/profilePage/profileAllData';
import ProfileForm from '@/src/components/profilePage/profileForm';
import Header from '@/src/components/common/header';
import { ProfileDatas } from '@/src/app/profile/api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { ProfileType } from '@/src/utils/type';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { AdminIcon } from '@/public/icon';
import Link from 'next/link';

const cn = classNames.bind(styles);

type ProfilePageProps = {
  params: {
    userId: string;
  };
};

const ProfilePage = ({ params }: ProfilePageProps) => {
  const { userId } = params;

  const {
    data: profileData,
    ref,
    isLoading,
    isFetchingNextPage,
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
  const isProfileOwner = profileData?.pages[0]?.isOwnProfile === true;
  const role = profileData?.pages[0]?.userRole === 'admin';

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <Header title={name}>
        {role && (
          <Link href={'/admin/list'}>
            <AdminIcon fill="black" />
          </Link>
        )}
      </Header>
      <div className={cn('secondContainer')}>
        <ProfileForm
          lists={profileInfo}
          isProfileOwner={isProfileOwner}
          params={params}
        />
        <ProfileAllData lists={profilePosts} />
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} />
    </div>
  );
};

export default ProfilePage;
