import NoticeLists from '../noticeLists';
import styles from './noticeForm.module.scss';
import classNames from 'classnames/bind';
import { noticeListData } from '@/src/utils/dummy';

const cn = classNames.bind(styles);

const NoticeForm = () => {
  return (
    <div className={cn('container')}>
      <header>
        <span>2024.09.06</span>
        <h1>9월 세팅 일정 변경</h1>
      </header>
      <NoticeLists lists={noticeListData} />
    </div>
  );
};

export default NoticeForm;
