import classNames from 'classnames/bind';
import styles from './profileGymData.module.scss';
import { fetchProfileFavoriteGyms } from '@/src/app/profile/api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { GymsType, metaType } from '@/src/utils/type';
import ProfileGymData from './profileGymData';

const cn = classNames.bind(styles);

type ProfileGymDatasProps = {
  params: {
    userId: string;
  };
};

type ProfileGymPageType = {
  favoriteGyms: GymsType[];
  meta: metaType;
  isOwnProfile: boolean;
  userRole: string;
};

const ProfileGymDatas = ({ params }: ProfileGymDatasProps) => {
  const { userId } = params;

  const {
    data: profileGymData,
    ref,
    isLoading,
    error,
  } = useInfiniteScroll<ProfileGymPageType>({
    queryKey: ['profileFavoriteGyms', userId],
    fetchFunction: (page = 1) =>
      fetchProfileFavoriteGyms({
        page,
        userId,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  // 각 페이지의 favoriteGyms 배열을 하나로 병합
  const profileGyms =
    profileGymData?.pages.flatMap((page) => page.favoriteGyms) ?? [];

  return (
    <div className={cn('outerContainer')}>
      {profileGyms.length > 0 ? (
        profileGyms.map((gym) => <ProfileGymData key={gym.gym_idx} gym={gym} />)
      ) : (
        <span className={cn('emptyMessage')}>
          아직 선호하는 클라이밍장이 없네요!😒
        </span>
      )}
      {isLoading && <span>Loading...</span>}
      <div ref={ref} />
      {error && <span>오류가 발생했습니다.</span>}
    </div>
  );
};

export default ProfileGymDatas;
