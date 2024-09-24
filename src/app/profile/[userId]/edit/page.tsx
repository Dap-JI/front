'use client';
import classNames from 'classnames/bind';
import styles from './profileEditPage.module.scss';
import ProfileEditForm from '@/src/components/profilePage/profileEditForm';
import Header from '@/src/components/common/header';

const cn = classNames.bind(styles);

type ProfileEditPageProps = {
  params: {
    userId: string;
  };
};

const ProfileEditPage = ({ params }: ProfileEditPageProps) => {
  const { userId } = params;
  const handleAccountDeletion = () => {
    alert('탈퇴 완료!');
  };
  return (
    <div className={cn('container')}>
      <Header page={`/profile/${userId}`}>
        <span onClick={handleAccountDeletion}>회원 탈퇴</span>
      </Header>
      <div className={cn('secondContainer')}>
        <ProfileEditForm params={params} />
      </div>
    </div>
  );
};

export default ProfileEditPage;

//이미지 업로드 하는 api하나로해
