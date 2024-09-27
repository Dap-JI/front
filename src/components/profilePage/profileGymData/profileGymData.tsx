// front/src/components/profilePage/profileGymData/ProfileGymData.tsx

import classNames from 'classnames/bind';
import styles from './profileGymData.module.scss';
import { GymsType } from '@/src/utils/type';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type ProfileGymDataProps = {
  gym: GymsType;
};

const ProfileGymData = ({ gym }: ProfileGymDataProps) => {
  const { name, address, logo, post_count, gym_idx } = gym;
  const router = useRouter();

  const gymClick = () => {
    router.push(`/climbList/${gym_idx}`);
  };

  return (
    <div className={cn('container')} onClick={gymClick}>
      <div className={cn('logoWrapper')}>
        <img
          src={logo ?? '/default_logo.png'}
          alt={name}
          className={cn('logo')}
        />
      </div>
      <div className={cn('mainContent')}>
        <h1 className={cn('name')}>{name}</h1>
        <span className={cn('address')}>{address}</span>
        <span className={cn('postCount')}>올린 동영상 수: {post_count}</span>
      </div>
      <div className={cn('favoriteStatus')}>⭐</div>{' '}
    </div>
  );
};

export default ProfileGymData;
