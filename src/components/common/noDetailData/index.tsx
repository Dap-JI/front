import styles from './noDetailData.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

const NodetailData = () => {
  return (
    <div className={cn('container')}>
      <span>답지가 없어요</span>
      <span> 회원님만의 답지를 공유해 주세요🙌</span>
    </div>
  );
};

export default NodetailData;
