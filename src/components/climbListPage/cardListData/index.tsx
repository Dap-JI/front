import { climbLists } from '@/src/utils/dummy';
import styles from './cardListData.module.scss';
import classNames from 'classnames/bind';
import CardList from '../cardList';
import { GymsType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type CardListProps = {
  lists: GymsType[];
};

const CardListData = ({ lists }: CardListProps) => {
  return (
    <div className={cn('container')}>
      {lists.map((list: GymsType) => (
        <CardList key={list.gym_idx} list={list} />
      ))}
    </div>
  );
};

export default CardListData;
