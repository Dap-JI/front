import styles from './followingBtn.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type FollowingBtnProps = {
  onClick: () => void;
  isFollow: boolean;
};

const FollowingBtn = ({ onClick, isFollow }: FollowingBtnProps) => {
  return (
    <div className={cn('container', { follow: isFollow })} onClick={onClick}>
      {isFollow ? '클로잉' : '클로우'}
    </div>
  );
};

export default FollowingBtn;
