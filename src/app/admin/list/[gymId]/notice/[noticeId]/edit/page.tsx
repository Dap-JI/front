'use client';
import classNames from 'classnames/bind';
import styles from './noticeEdit.module.scss';
import Header from '@/src/components/common/header';
import NoticeuUploadForm from '@/src/components/adminPage/adminNoticeUploadPage/noticeuUploadForm';
import { useQuery } from '@tanstack/react-query';
import { fetchNoticeData } from '@/src/app/climbList/api';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
const cn = classNames.bind(styles);

type NoticeEditPageProps = {
  params: {
    gymId: string;
    noticeId: string;
  };
};
const NoticeEditPage = ({ params }: NoticeEditPageProps) => {
  const { gymId, noticeId } = params;
  const { data: noticeDatas } = useQuery({
    queryKey: ['noticeDatas'],
    queryFn: () => fetchNoticeData(gymId, noticeId),
  });

  if (!noticeDatas) {
    return <LoadingSpinner />;
  }
  return (
    <div className={cn('container')}>
      <Header back={true} title="공지 수정" />
      <div className={cn('secondContainer')}>
        <NoticeuUploadForm params={params} initialData={noticeDatas} />
      </div>
    </div>
  );
};

export default NoticeEditPage;
