'use client';
import Header from '@/src/components/common/header';
import styles from './noticPage.module.scss';
import classNames from 'classnames/bind';
import NoticeLists from '@/src/components/noticePage/noticeLists';
import { useQuery } from '@tanstack/react-query';
import { fetchNoticeData } from '../../../api';
import { noticeDataType } from '@/src/utils/type';
import LoadingSpinner from '@/src/components/common/loadingSpinner';

const cn = classNames.bind(styles);

type NoticepageProps = {
  params: {
    gymId: string;
    noticeId: string;
  };
};

const Noticepage = ({ params }: NoticepageProps) => {
  const { gymId, noticeId } = params;
  const { data: noticeDatas, isLoading } = useQuery<noticeDataType>({
    queryKey: ['noticeDatas'],
    queryFn: () => fetchNoticeData(gymId, noticeId),
  });

  if (!noticeDatas || isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className={cn('container')}>
      <Header back={true} title="공지" />
      <div className={cn('secondContainer')}>
        <NoticeLists noticeDatas={noticeDatas} />
      </div>
    </div>
  );
};

export default Noticepage;

//소제목과 내용?
