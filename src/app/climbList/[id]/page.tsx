import classNames from 'classnames/bind';
import styles from './DetailPage.module.scss';
import Notification from '@/src/components/climbListDetailPage/notification';
import HolderColor from '@/src/components/climbListDetailPage/holdColor';
import DetailMainContent from '@/src/components/climbListDetailPage/detailMainContent';

const cn = classNames.bind(styles);

const DetailPage = () => {
  return (
    <div className={cn('container')}>
      <h1> 클라이밍장 이름 </h1>
      <div>
        <Notification />
        <HolderColor />
      </div>
      <div>
        <DetailMainContent />
      </div>
    </div>
  );
};

export default DetailPage;
