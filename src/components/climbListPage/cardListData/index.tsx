import { climbLists } from '@/src/utils/dummy';
import styles from './cardListData.module.scss';
import classNames from 'classnames/bind';
import CardList from '../cardList';
import { ClimbLIstType } from '@/src/utils/dummy';

const cn = classNames.bind(styles);

type CardListProps = {
  lists: ClimbLIstType[];
};
const CardListData = ({ lists }: CardListProps) => {
  return (
    <div className={cn('container')}>
      {climbLists.map((list: ClimbLIstType) => (
        <div key={list.gym_idx}>
          <CardList list={list} />
        </div>
      ))}
    </div>
  );
};

export default CardListData;
