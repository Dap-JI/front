import Header from '@/src/components/common/header';
import styles from './noticPage.module.scss';
import classNames from 'classnames/bind';
import NoticeForm from '@/src/components/noticePage/noticeForm';

const cn = classNames.bind(styles);

const Noticepage = () => {
  return (
    <div className={cn('container')}>
      <Header back={true} title='공지'/>
      <div className={cn('secondContainer')}>
        <NoticeForm />
      </div>
    </div>
  );
};

export default Noticepage;
  
//소제목과 내용?