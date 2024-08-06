'use client';
import classNames from 'classnames/bind';
import styles from './profileEditPage.module.scss';
import EditForm from '@/src/components/editPage/editForm';
import Header from '@/src/components/common/header';

const cn = classNames.bind(styles);

type ProfileEditPageProps = {
  params: {
    userId: string;
  };
};

const ProfileEditPage = ({ params }: ProfileEditPageProps) => {
  return (
    <div className={cn('container')}>
      <Header title="프로필 수정할거임" />
      <div className={cn('secondContainer')}>
        <EditForm params={params} />
      </div>
    </div>
  );
};

export default ProfileEditPage;

//이미지 업로드 하는 api하나로해
