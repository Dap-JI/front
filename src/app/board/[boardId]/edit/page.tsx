'use client';
import styles from './boardDetailEditPage.module.scss';
import classNames from 'classnames/bind';
import Header from '@/src/components/common/header';
import BoardUploadForm from '@/src/components/boardUploadPage/boardUploadForm';
import { boardDetailGetDatas } from '@/src/app/board/api';
import { BoardDetailDataType } from '@/src/utils/type';
import { useQuery } from '@tanstack/react-query';

const cn = classNames.bind(styles);

type BoardEditPageProps = {
  params: {
    boardId: string;
  };
};

const BoardEditPage = ({ params }: BoardEditPageProps) => {
  const { boardId } = params;

  const { data: boardDetailData, isLoading } = useQuery<BoardDetailDataType>({
    queryKey: ['boardDetailData'],
    queryFn: () => boardDetailGetDatas(boardId),
  });

  return (
    <div className={cn('container')}>
      <Header page={`/board/${boardId}`}></Header>
      <div className={cn('secondContainer')}>
        <BoardUploadForm params={params} initialData={boardDetailData} />
      </div>
    </div>
  );
};

export default BoardEditPage;
