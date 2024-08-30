import { CommentIcon } from '@/public/icon';
import classNames from 'classnames/bind';
import styles from './commentCount.module.scss';

const cn = classNames.bind(styles);

type CommentCountProps = {
  count: number;
};

const CommentCount = ({ count }: CommentCountProps) => {
  return (
    <div className={cn('container')}>
      <CommentIcon width="20" height="20" />
      <span>{count}</span>
    </div>
  );
};

export default CommentCount;
