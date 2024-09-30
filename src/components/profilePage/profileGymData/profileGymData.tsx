import classNames from 'classnames/bind';
import styles from './profileGymData.module.scss';
import { GymsType } from '@/src/utils/type';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FavoriteAction from '../../climbListPage/favoriteClimbList';
import { RightArrowIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type ProfileGymDataProps = {
  gym: GymsType;
};

const ProfileGymData = ({ gym }: ProfileGymDataProps) => {
  const { name, address, logo, post_count, gym_idx } = gym;
  const router = useRouter();

  // const { handleFavoriteClick, favoriteToggle } = useFavoriteAction({
  //   initalFavoriteToggle: is_favorite,
  //   gymId: gym_idx,
  // });

  const gymClick = () => {
    router.push(`/climbList/${gym_idx}`);
  };

  return (
    <li className={cn('container')} onClick={gymClick}>
      <div className={cn('image')}>
        <Image
          src={logo || process.env.NEXT_PUBLIC_URL + '/icon/icon.png'}
          alt="로고이미지"
          width={80}
          height={80}
          priority
          className={cn('image')}
        />
      </div>
      <div className={cn('textWrapper')}>
        <div className={cn('nameWrapper')}>
          <span className={cn('name')}>{name}</span>
          {/* <FavoriteAction
            favoriteToggle={favoriteToggle}
            onClick={handleFavoriteClick}
          /> */}
        </div>
        <span className={cn('address')}>{address}</span>
        <span className={cn('post_count')}>동영상 갯수 : {post_count}</span>
      </div>
      <div className={cn('actionBtn')}>
        <RightArrowIcon width="15" height="15" />
      </div>
    </li>
  );
};

export default ProfileGymData;
