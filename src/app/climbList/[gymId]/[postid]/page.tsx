import React from 'react';
import styles from './PostDetailPage.module.scss';
import classNames from 'classnames/bind';
import Header from '@/src/components/common/header';
import PostDetailForm from '@/src/components/postDetailPage/postDetailForm';

const cn = classNames.bind(styles);

type PostDetailPageProps = {
  params: { postid: string; gymId: string };
};

const PostDetailPage = ({ params }: PostDetailPageProps) => {
  return (
    <div className={cn('container')}>
      <Header back={true} />
      <div className={cn('secondContainer')}>
        <PostDetailForm params={params} />
      </div>
    </div>
  );
};

export default PostDetailPage;

//여기서 공유하고 수정할거임
