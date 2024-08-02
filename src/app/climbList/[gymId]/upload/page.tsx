'use client';
import classNames from 'classnames/bind';
import styles from './detailUploadPage.module.scss';
import UploadForm from '@/src/components/uploadPage/uploadForm';

const cn = classNames.bind(styles);
type DetailPageProps = {
  params: { gymId: string };
};
const DetailUploadPage = () => {
  // const { gymId } = params;
  return (
    <div className={cn('container')}>
      <UploadForm />
    </div>
  );
};

export default DetailUploadPage;

//여기선 업로드만 할거임
