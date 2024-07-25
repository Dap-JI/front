import styles from './cardList.module.scss';
import classNames from 'classnames/bind';
import { ClimbLIstType } from '@/src/utils/dummy';
import Image from 'next/image';

const cn = classNames.bind(styles);

type CardListProps = {
  list: ClimbLIstType;
};

const CardList = ({ list }: CardListProps) => {
  const { logo, name } = list;
  return (
    <li className={cn('container')}>
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
