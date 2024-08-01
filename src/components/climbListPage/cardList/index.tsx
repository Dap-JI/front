'use client';
import styles from './cardList.module.scss';
import classNames from 'classnames/bind';
import { ClimbLIstType } from '@/src/utils/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const cn = classNames.bind(styles);

type CardListProps = {
  list: ClimbLIstType;
};

const CardList = ({ list }: CardListProps) => {
  const { logo, name, gym_idx } = list;
  const router = useRouter();

  // const detailClick = (gym_idx: number | undefined) => {
  //   router.push(`/climbList/${gym_idx}`);
  // };

  return (
    <Link href={`/climbList/${gym_idx}`} prefetch={true}>
      <li className={cn('container')}>
        <div className={cn('image')}>
          {logo ? (
            <Image
              src={logo}
              alt="로고이미지"
              width={60}
              height={60}
              className={cn('image')}
            />
          ) : (
            ''
          )}
        </div>
        <span>{name}</span>
      </li>
    </Link>
  );
};

export default CardList;
