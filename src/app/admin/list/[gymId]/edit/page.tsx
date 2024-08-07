'use client';
import classNames from 'classnames/bind';
import styles from './adminClimbListEditPage.module.scss';
import Header from '@/src/components/common/header';
import AdminClimbListEditForm from '@/src/components/adminPage/adminClimbListEditPage/adminClimbListUpdateForm';
import { useClimbListDetails } from '@/src/app/climbList/api';
const cn = classNames.bind(styles);

type AdminClimbListEditPageprops = {
  params: {
    gymId: string;
  };
};

const AdminClimbListEditPage = ({ params }: AdminClimbListEditPageprops) => {
  const { gymId } = params;
  const { data: climbListDetails } = useClimbListDetails(gymId);
  const climbListDetail = climbListDetails ?? '';

  return (
    <div className={cn('container')}>
      <Header title={'클라이밍짐 리스트 수정'} />
      <div className={cn('secondContainer')}>
        <AdminClimbListEditForm climbListDetail={climbListDetail} params={params} />
      </div>
    </div>
  );
};

export default AdminClimbListEditPage;

//admin/list/edit
