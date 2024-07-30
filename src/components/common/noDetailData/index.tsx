import styles from './noDetailData.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

const NodetailData = () => {
  return <div className={cn('container')}>답지를 추가해보세요</div>;
};

export default NodetailData;
