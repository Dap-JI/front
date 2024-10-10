'use client';
import classNames from 'classnames/bind';
import styles from './profileEditPage.module.scss';
import ProfileEditForm from '@/src/components/profilePage/profileEditForm';
import Header from '@/src/components/common/header';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type ProfileEditPageProps = {
  params: {
    userId: string;
  };
};

const ProfileEditPage = ({ params }: ProfileEditPageProps) => {
  const { userId } = params;
  const router = useRouter();

  const handleAccountDeletion = () => {
    router.push(`/deleteAccount`);
  };

  return (
    <div className={cn('container')}>
      <Header page={`/profile/${userId}`}>
        <span onClick={handleAccountDeletion}>계정 삭제</span>
      </Header>
      <div className={cn('secondContainer')}>
        <ProfileEditForm params={params} />
      </div>
    </div>
  );
};

export default ProfileEditPage;

//이미지 업로드 하는 api하나로해
