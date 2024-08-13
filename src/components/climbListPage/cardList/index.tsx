'use client';
import styles from './cardList.module.scss';
import classNames from 'classnames/bind';
import { GymsType } from '@/src/utils/type';
import Image from 'next/image';
import Link from 'next/link';
import { RightArrowIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type CardListProps = {
  list: GymsType;
};

const CardList = ({ list }: CardListProps) => {
  const { logo, name, gym_idx, address } = list;

  return (
    <Link
      href={`/climbList/${gym_idx}`}
      prefetch={true}
      style={{ textDecoration: 'none' }}
    >
      <li className={cn('container')}>
        <div className={cn('image')}>
          <Image
            src={logo || '/icon/icon.png'}
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
          <RightArrowIcon />
        </div>
      </li>
    </Link>
  );
};

export default CardList;
