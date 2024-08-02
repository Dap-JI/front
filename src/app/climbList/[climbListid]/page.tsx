'use client';

import classNames from 'classnames/bind';
import styles from './DetailPage.module.scss';
import Notification from '@/src/components/climbListDetailPage/notification';
import HoldColorList from '@/src/components/climbListDetailPage/holdColorList';
import DetailMainContentList from '@/src/components/climbListDetailPage/detailMainContent';
import { AddIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import { ClimbDetailDatas } from '@/src/app/climbList/api';
import NodetailData from '@/src/components/common/noDetailData';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/src/components/loadingSpinner';
import Header from '@/src/components/header';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { ClimbDetailResponseType } from '@/src/utils/type';

const cn = classNames.bind(styles);
type DetailPageProps = {
  params: { climbListid: string };
};

const DetailPage = ({ params }: DetailPageProps) => {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [isUpLoading, setIsUpLoading] = useState(false);

  const router = useRouter();
  const { climbListid } = params;

  const {
    data: climbDetailData,
    ref,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteScroll<ClimbDetailResponseType>({
    queryKey: ['climbDetail', climbListid, activeColor],
    fetchFunction: (pageParam = 1) =>
      ClimbDetailDatas({ pageParam, climbListid, color: activeColor }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  console.log(climbDetailData);

  const lists = climbDetailData?.pages.flatMap((page) => page.posts) ?? [];
  const gymName = climbDetailData?.pages[0]?.gym_name ?? '';
  const noList = lists.length === 0;

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
      <Header title={gymName}>
        <AddIcon onClick={uploadPage} />
      </Header>
      <div className={cn('secondContainer')}>
        <Notification />
        <HoldColorList
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
        {noList && <NodetailData />}
        <DetailMainContentList lists={lists} />
      </div>
      {isFetchingNextPage && <LoadingSpinner />}
      {!hasNextPage && <div>No more data</div>}
      <div ref={ref} />
    </div>
  );
};

export default DetailPage;

// 'use client';

// import classNames from 'classnames/bind';
// import styles from './DetailPage.module.scss';
// import Notification from '@/src/components/climbListDetailPage/notification';
// import HoldColorList from '@/src/components/climbListDetailPage/holdColorList';
// import DetailMainContentList from '@/src/components/climbListDetailPage/detailMainContent';
// import { AddIcon } from '@/public/icon';
// import { useRouter } from 'next/navigation';
// import { useClimbDetailDatas, ClimbDetailDatas } from '@/src/app/climbList/api';
// import NodetailData from '@/src/components/common/noDetailData';
// import { useState } from 'react';
// import LoadingSpinner from '@/src/components/loadingSpinner';
// import Header from '@/src/components/header';
// import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
// import { ClimbDetailResponseType } from '@/src/utils/type';
// import fetchData from '@/src/utils/fetchData';

// const cn = classNames.bind(styles);
// type DetailPageProps = {
//   params: { climbListid: string };
// };

// const DetailPage = ({ params }: DetailPageProps) => {
//   const [activeColor, setActiveColor] = useState<string | null>(null);
//   const [isUpLoading, setIsUpLoading] = useState(false);

//   const router = useRouter();
//   const { climbListid } = params;

//   const fetchClimbDetails = async (page: number, color: string) => {
//     return await ClimbDetailDatas(page, climbListid, color);
//   };

//   const {
//     data: climbDetailData,
//     ref,
//     isLoading,
//     isFetchingNextPage,
//     hasNextPage,
//     refetch,
//   } = useInfiniteScroll<ClimbDetailResponseType>({
//     queryKey: ['climbDetail', climbListid],
//     fetchFunction: fetchClimbDetails,
//     getNextPageParam: (lastPage) =>
//       lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
//   });
//   console.log(climbDetailData);

//   const lists = climbDetailData?.pages.flatMap((page) => page.posts) ?? [];
//   const gymName = climbDetailData?.pages[0].gym_name ?? '';
//   const noList = lists.length === 0;

//   // 뒤로가기
//   const uploadPage = () => {
//     setIsUpLoading(true);
//     router.push(`/climbList/${climbListid}/upload`);
//   };
//   //업로드 페이지

//   if (isLoading || isUpLoading) {
//     return <LoadingSpinner />;
//   }

//   //로딩중 들어가야할 것
//   return (
//     <div className={cn('container')}>
//       <Header title={gymName}>
//         <AddIcon onClick={uploadPage} />
//       </Header>
//       <div className={cn('secondContainer')}>
//         <Notification />
//         <HoldColorList
//           activeColor={activeColor}
//           setActiveColor={setActiveColor}
//         />
//         {noList && <NodetailData />}
//         <DetailMainContentList lists={lists} />
//       </div>
//       {isFetchingNextPage && <LoadingSpinner />}
//       {!hasNextPage && <div>No more data</div>}
//       <div ref={ref} />
//     </div>
//   );
// };

// export default DetailPage;
