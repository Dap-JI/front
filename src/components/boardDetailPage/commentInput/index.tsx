import { UpIcon } from '@/public/icon';
import CommonInput from '../../common/commonInput';
import styles from './commentInput.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const CommentInput = () => {
  return (
    <CommonInput
      className={cn('customInput')}
      suffix={
        <div className={cn('iconWrapper')}>
          <UpIcon width="20" height="20" />
        </div>
      }
    />
  );
};

export default CommentInput;
