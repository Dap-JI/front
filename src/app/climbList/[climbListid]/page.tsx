'use client';

import classNames from 'classnames/bind';
import styles from './DetailPage.module.scss';
import Notification from '@/src/components/climbListDetailPage/notification';
import HoldColorList from '@/src/components/climbListDetailPage/holdColorList';
import DetailMainContentList from '@/src/components/climbListDetailPage/detailMainContent';
import { LeftArrowIcon, AddIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import { useClimbDetailDatas } from '@/src/app/climbList/api';
import NodetailData from '@/src/components/common/noDetailData';
import { useState } from 'react';
import LoadingSpinner from '@/src/components/loadingSpinner';

const cn = classNames.bind(styles);
type DetailPageProps = {
  params: { climbListid: string };
};

const DetailPage = ({ params }: DetailPageProps) => {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [isUpLoading, setIsUpLoading] = useState(false);

  const router = useRouter();
  const { climbListid } = params;

  const { data: climbDetailDatas, isLoading } = useClimbDetailDatas({
    climbListid,
  });
  //클라이밍장 별 상세 데이터

  const lists = climbDetailDatas?.posts ?? [];
  const gymName = climbDetailDatas?.gym_name ?? '';
  const noList = climbDetailDatas?.posts.length === 0;

  const backClick = () => {
    router.back();
  };
  // 뒤로가기
  const uploadPage = () => {
    setIsUpLoading(true);
    router.push(`/climbList/${climbListid}/upload`);
  };
  //업로드 페이지

  if (isLoading || isUpLoading) {
    return <LoadingSpinner />;
  }
  //로딩중 들어가야할 것

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <LeftArrowIcon onClick={backClick} />
        <h1>{gymName}</h1>
        <AddIcon onClick={uploadPage} />
      </div>
      <div>
        <Notification />
        <HoldColorList
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
      </div>
      <div>
        {noList && <NodetailData />}
        <DetailMainContentList lists={lists} />
      </div>
    </div>
  );
};

export default DetailPage;
