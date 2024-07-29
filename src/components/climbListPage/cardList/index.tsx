'use client';
import styles from './cardList.module.scss';
import classNames from 'classnames/bind';
import { ClimbLIstType } from '@/src/utils/dummy';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type CardListProps = {
  list: ClimbLIstType;
};

const CardList = ({ list }: CardListProps) => {
  const { logo, name, gym_idx } = list;
  const router = useRouter();

  const detailClick = (gym_ixd: number | undefined) => {
    router.push(`/climbList/${gym_ixd}`);
  };

  return (
    <li className={cn('container')} onClick={() => detailClick(gym_idx)}>
      <div className={cn('image')}>
        <Image
          src={logo}
          alt="로고이미지"
          width={60}
          height={60}
          className={cn('image')}
        />
      </div>
      <span>{name}</span>
    </li>
  );
};

export default CardList;
