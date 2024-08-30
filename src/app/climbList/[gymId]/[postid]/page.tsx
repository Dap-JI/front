'use client';
import React from 'react';
import styles from './PostDetailPage.module.scss';
import classNames from 'classnames/bind';
import Header from '@/src/components/common/header';
import PostDetailForm from '@/src/components/postDetailPage/postDetailForm';
import { usePostDetailDatas } from '@/src/app/climbList/api';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import ModalChoice from '@/src/components/common/moadlChoice';

const cn = classNames.bind(styles);

type PostDetailPageProps = {
  params: { postid: string; gymId: string };
};

const PostDetailPage = ({ params }: PostDetailPageProps) => {
  const { postid, gymId } = params;

  const { data: postDetailDatas, isLoading } = usePostDetailDatas(postid);

  if (isLoading || !postDetailDatas) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <Header page={`/climbList/${gymId}`} />
      <div className={cn('secondContainer')}>
        <PostDetailForm params={params} postDetailDatas={postDetailDatas} />
      </div>
      <ModalChoice />
    </div>
  );
};

export default PostDetailPage;
