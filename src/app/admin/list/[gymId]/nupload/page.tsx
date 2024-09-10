import classNames from 'classnames/bind';
import styles from './noticeuploadPage.module.scss';
import Header from '@/src/components/common/header';
import NoticeuUploadForm from '@/src/components/adminPage/adminNoticeUploadPage/noticeuUploadForm';
const cn = classNames.bind(styles);

type NoticeUploadPageProps = {
  params: {
    gymId: string;
  };
};
const NoticeUploadPage = ({ params }: NoticeUploadPageProps) => {
  return (
    <div className={cn('container')}>
      <Header back={true} title="공지 업로드" />
      <div className={cn('secondContainer')}>
        <NoticeuUploadForm params={params} />
      </div>
    </div>
  );
};

export default NoticeUploadPage;
