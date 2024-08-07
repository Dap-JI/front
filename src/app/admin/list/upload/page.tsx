import styles from './AdminClimbListUploadPage.module.scss';
import classNames from 'classnames/bind';
import Header from '@/src/components/common/header';
import AdminClimbListUploadForm from '@/src/components/adminPage/adminClimbListUploadPage/adminClimbListUploadForm';
const cn = classNames.bind(styles);

const AdminClimbListUploadPage = () => {
  return (
    <div className={cn('container')}>
      <Header title={'클라이밍짐 리스트 추가'} />
      <div className={cn('secondContainer')}>
        <AdminClimbListUploadForm />
      </div>
    </div>
  );
};

export default AdminClimbListUploadPage;
