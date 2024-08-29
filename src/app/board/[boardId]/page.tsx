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
import {
  BoardCommentType,
  BoardDetailDataType,
  BoardCommentDetailType,
} from '@/src/utils/type';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import CommentInput from '@/src/components/boardDetailPage/commentInput';
import { useRef, useState } from 'react';
import ModalChoice from '@/src/components/common/moadlChoice';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import Header from '@/src/components/common/header';

const cn = classNames.bind(styles);

type BoardDetailPageProps = {
  params: {
    boardId: string;
  };
};

const BoardDetailPage = ({ params }: BoardDetailPageProps) => {
  const { boardId } = params;
  const [tagNickname, setTagNickname] = useState('');
  const [selectId, setSelectId] = useState('');

  //게시판 상세 내용데이터
  const { data: boardDetailData, isLoading } = useQuery<BoardDetailDataType>({
    queryKey: ['boardDetailData'],
    queryFn: () => boardDetailGetDatas(boardId),
  });

  //게시판 댓글 데이터

  const {
    data: boardDetailCommentData,
    ref,
    isFetchingNextPage,
  } = useInfiniteScroll<BoardCommentType>({
    queryKey: ['boardDetailComment'],
    fetchFunction: (page = 1) => boardDetailCommentGetDatas({ page, boardId }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const commentDatas: BoardCommentDetailType[] =
    boardDetailCommentData?.pages.flatMap((page) => page.comments) ?? [];

  const containerRef = useRef<HTMLDivElement | null>(null);

  if (isLoading || !boardDetailData) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <Header page={`/board`} />
      <main className={cn('secondContainer')}>
        <section>
          <BoardDetailForm boardDetailData={boardDetailData} />
        </section>
        <section ref={containerRef}>
          <CommentLists
            lists={commentDatas}
            setTagNickname={setTagNickname}
            setSelectId={setSelectId}
          />
          <div ref={ref} />
          {isFetchingNextPage && <LoadingSpinner />}
        </section>
      </main>
      <CommentInput
        params={params}
        tagNickname={tagNickname}
        setTagNickname={setTagNickname}
        selectId={selectId}
      />
      <ModalChoice />
    </div>
  );
};

export default BoardDetailPage;
