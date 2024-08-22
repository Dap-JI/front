'use client';
import React from 'react';
import styles from './PostDetailPage.module.scss';
import classNames from 'classnames/bind';
import Header from '@/src/components/common/header';
import PostDetailForm from '@/src/components/postDetailPage/postDetailForm';
import { usePostDetailDatas } from '@/src/app/climbList/api';
import LoadingSpinner from '@/src/components/common/loadingSpinner';

const cn = classNames.bind(styles);

type PostDetailPageProps = {
  params: { postid: string; gymId: string };
};

const PostDetailPage = ({ params }: PostDetailPageProps) => {
  const { postid } = params;

  const { data: postDetailDatas, isLoading } = usePostDetailDatas(postid);

  if (isLoading || !postDetailDatas) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <Header back={true} />
      <div className={cn('secondContainer')}>
        <PostDetailForm params={params} postDetailDatas={postDetailDatas} />
      </div>
    </div>
  );
};

export default PostDetailPage;

//여기서 공유하고 수정할거임
