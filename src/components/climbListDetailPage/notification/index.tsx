import classNames from 'classnames/bind';
import styles from './notification.module.scss';
import { BellIcon, RightArrowIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type NotificationProps = {
  onClick: () => void;
  title: string | undefined;
};

const Notification = ({ onClick, title }: NotificationProps) => {
  return (
    <div className={cn('container')} onClick={onClick}>
      <BellIcon />
      <p>{title}</p>
      <RightArrowIcon width="15" height="15" />
    </div>
  );
};

export default Notification;
