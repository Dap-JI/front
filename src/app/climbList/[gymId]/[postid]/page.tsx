'use client';
import { useState } from 'react';
import styles from './PostDetailPage.module.scss';
import classNames from 'classnames/bind';
import Header from '@/src/components/common/header';
import PostDetailForm from '@/src/components/postDetailPage/postDetailForm';
import { usePostDetailDatas } from '@/src/app/climbList/api';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import ModalChoice from '@/src/components/common/moadlChoice';
import CommentInput from '@/src/components/boardDetailPage/commentInput';
import PostCommentLists from '@/src/components/postDetailPage/postCommentLists';
import useInfiniteScroll from '@/src/hooks/useInfiniteScroll';
import { CommentDatas } from '@/src/hooks/useCommentDatas';
import { PostCommentType, PostCommentDetailType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type PostDetailPageProps = {
  params: { postid: string; gymId: string };
};

const PostDetailPage = ({ params }: PostDetailPageProps) => {
  const { postid, gymId } = params;
  const [tagNickname, setTagNickname] = useState('');
  const [selectId, setSelectId] = useState('');

  const { data: postDetailDatas, isLoading } = usePostDetailDatas(postid);
  //포스트 상세페이지 데이터

  const {
    data: postDetailCommentData,
    isFetchingNextPage,
    ref,
  } = useInfiniteScroll<PostCommentType>({
    queryKey: ['postDetailComment'],
    fetchFunction: (page = 1) =>
      CommentDatas({
        page,
        content_id: postid,
        category: 'postComment',
      }),
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
  });

  const commentDatas: PostCommentDetailType[] =
    postDetailCommentData?.pages.flatMap((page) => page.postComments) ?? [];

  if (isLoading || !postDetailDatas) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <Header page={`/climbList/${gymId}`} />
      <main className={cn('secondContainer', tagNickname && 'tagNickname')}>
        <section>
          <PostDetailForm params={params} postDetailDatas={postDetailDatas} />
        </section>
        <section>
          <PostCommentLists
            lists={commentDatas}
            setTagNickname={setTagNickname}
            setSelectId={setSelectId}
          />
          <div ref={ref} />
        </section>
      </main>
      <CommentInput
        params={{ postId: postid }}
        tagNickname={tagNickname}
        setTagNickname={setTagNickname}
        selectId={selectId}
      />
      <ModalChoice />
    </div>
  );
};

export default PostDetailPage;
