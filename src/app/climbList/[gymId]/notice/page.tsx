import Header from '@/src/components/common/header';
import styles from './noticPage.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Noticepage = () => {
  return (
    <div className={cn('container')}>
      <Header back={true} />
      <div className={cn('secondContainer')}>
        <div>공지사항 </div>
      </div>
    </div>
  );
};

export default Noticepage;
