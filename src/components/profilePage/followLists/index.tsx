import classNames from 'classnames/bind';
import styles from './followLists.module.scss';

const cn = classNames.bind(styles);

const FollowList = () => {
  return <div>FollowLists</div>;
};

const FollowLists = () => {
  return (
    <div>
      <FollowList />
    </div>
  );
};

export default FollowLists;
