import classNames from 'classnames/bind';
import styles from './profileGymData.module.scss';
import { fetchProfileFavoriteGyms } from '@/src/app/profile/api';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { ProfileFavoriteGymType } from '@/src/utils/type';
import ProfileGymData from './profileGymData';

const cn = classNames.bind(styles);

type ProfileGymDatasProps = {
  params: {
    userId: string;
  };
  name: string;
};

const ProfileGymDatas = ({ params, name }: ProfileGymDatasProps) => {
  const { userId } = params;

  const {
    data: profileGymData,
    ref,
    isLoading,
    error,
  } = useInfiniteScroll<ProfileFavoriteGymType>({
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
        <>
          <span className={cn('favoriteList')}>
            {name}님의 최애 클라이밍장 ❤️
          </span>
          {profileGyms.map((gym) => (
            <ProfileGymData key={gym.gym_idx} gym={gym} />
          ))}
        </>
      ) : (
        <span className={cn('emptyMessage')}>
          아직 선호하는 클라이밍장이 없네요😒
        </span>
      )}
      {isLoading && <span>Loading...</span>}
      <div ref={ref} />
    </div>
  );
};

export default ProfileGymDatas;

//00님의 최애 클라이밍장
