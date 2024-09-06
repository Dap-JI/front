import classNames from 'classnames/bind';
import styles from './notification.module.scss';
import { BellIcon, RightArrowIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type NotificationProps = {
  onClick: any;
};

const Notification = ({ onClick }: NotificationProps) => {
  return (
    <div className={cn('container')} onClick={onClick}>
      <BellIcon />
      <p>
        8월 락랜드 회원권 할인 정보8월 락랜드 회원권 할인 정보8월 락랜드 회원권
        할인 정보
      </p>
      <RightArrowIcon width="15" height="15" />
    </div>
  );
};

export default Notification;
