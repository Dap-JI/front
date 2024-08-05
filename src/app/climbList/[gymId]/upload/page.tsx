'use client';
import classNames from 'classnames/bind';
import styles from './detailUploadPage.module.scss';
import PostUploadForm from '@/src/components/postUploadPage/postUploadForm';

const cn = classNames.bind(styles);

type DetailPageProps = {
  params: { gymId: string };
};
const DetailUploadPage = ({ params }: DetailPageProps) => {
  const { gymId } = params;

  return (
    <div className={cn('container')}>
      <PostUploadForm gymId={gymId} />
    </div>
  );
};

export default DetailUploadPage;

//여기선 업로드만 할거임
