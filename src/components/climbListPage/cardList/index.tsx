'use client';
import styles from './cardList.module.scss';
import classNames from 'classnames/bind';
import { GymsType } from '@/src/utils/type';
import Image from 'next/image';
import { RightArrowIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type CardListProps = {
  list: GymsType;
};

const CardList = ({ list }: CardListProps) => {
  const { logo, name, gym_idx, address } = list;
  const router = useRouter();

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
        <span>{name}</span>
        <span>{address}</span>
      </div>
      <div className={cn('actionBtn')}>
        <RightArrowIcon width="15" height="15" />
      </div>
    </li>
  );
};

export default CardList;
