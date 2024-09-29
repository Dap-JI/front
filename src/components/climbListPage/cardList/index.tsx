'use client';
import styles from './cardList.module.scss';
import classNames from 'classnames/bind';
import { GymsType } from '@/src/utils/type';
import Image from 'next/image';
import { RightArrowIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import FavoriteAction from '../favoriteClimbList';
import useFavoriteAction from '@/src/hooks/useFavoriteAction';

const cn = classNames.bind(styles);

type CardListProps = {
  list: GymsType;
};

const CardList = ({ list }: CardListProps) => {
  const { logo, name, gym_idx, address, is_favorite } = list;
  const router = useRouter();
  const { handleFavoriteClick, favoriteToggle } = useFavoriteAction({
    initalFavoriteToggle: is_favorite,
    gymId: gym_idx,
  });

  const detailClick = () => {
    router.push(`/climbList/${gym_idx}`);
  };

  return (
    <li className={cn('container')} onClick={detailClick}>
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
          <FavoriteAction
            favoriteToggle={favoriteToggle}
            onClick={handleFavoriteClick}
          />
        </div>
        <span className={cn('address')}>{address}</span>
      </div>
      <div className={cn('actionBtn')}>
        <RightArrowIcon width="15" height="15" />
      </div>
    </li>
  );
};

export default CardList;
