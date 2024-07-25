import { climbLists } from '@/src/utils/dummy';
import styles from './cardListData.module.scss';
import classNames from 'classnames/bind';
import CardList from '../cardList';

const cn = classNames.bind(styles);


const CardListData = () => {
  return (
    <div className={cn('container')}>
      {climbLists.map((list) => (
        <div key={list.gym_id}>
          <CardList list={list} />
        </div>
      ))}
    </div>
  );
};

export default CardListData;
