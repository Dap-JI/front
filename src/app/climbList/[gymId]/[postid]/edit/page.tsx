'use client';
import styles from './postDetailEdit.module.scss';
import classNames from 'classnames/bind';
import PostUploadForm from '@/src/components/postUploadPage/postUploadForm';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import { usePostDetailDatas } from '@/src/app/climbList/api';

const cn = classNames.bind(styles);

type PostDetailEditPageProps = {
  params: { postid: string; gymId: string };
};

const PostDetailEditPage = ({ params }: PostDetailEditPageProps) => {
  const { postid, gymId } = params;
  const { data: postDetailDatas, isLoading } = usePostDetailDatas(postid);

  if (isLoading || !postDetailDatas) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <PostUploadForm gymId={gymId} initialData={postDetailDatas} />
    </div>
  );
};

export default PostDetailEditPage;
