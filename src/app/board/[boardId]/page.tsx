'use client';
import styles from './boardDetailPage.module.scss';
import classNames from 'classnames/bind';
import BoardDetailForm from '@/src/components/boardDetailPage/boardDetailForm';
import CommentLists from '@/src/components/boardDetailPage/commentLists';
import {
  boardDetailGetDatas,
  boardDetailCommentGetDatas,
} from '@/src/app/board/api';
import { useQuery } from '@tanstack/react-query';
import { BoardCommentType, BoardDetailDataType } from '@/src/utils/type';
import LoadingSpinner from '@/src/components/common/loadingSpinner';

const cn = classNames.bind(styles);

type BoardDetailPageProps = {
  params: {
    boardId: string;
  };
};

const BoardDetailPage = ({ params }: BoardDetailPageProps) => {
  const { boardId } = params;

  const { data: boardDetailData, isLoading } = useQuery<BoardDetailDataType>({
    queryKey: ['boardDetailData'],
    queryFn: () => boardDetailGetDatas(boardId),
  });

  const { data: boardDetaiCommentlData } = useQuery<BoardCommentType>({
    queryKey: ['boardDetaiCommentlData'],
    queryFn: () => boardDetailCommentGetDatas(boardId),
  });

  // console.log(boardDetailData);
  // console.log(boardDetaiCommentlData);

  if (isLoading || !boardDetailData) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <main className={cn('secondContainer')}>
        <section>
          <BoardDetailForm boardDetailData={boardDetailData} />
        </section>
        <section>
          <CommentLists />
        </section>
      </main>
    </div>
  );
};

export default BoardDetailPage;
