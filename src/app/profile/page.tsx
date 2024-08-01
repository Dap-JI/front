import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import ProfileAllData from '@/src/components/profilePage/profileAllData';
import ProfileForm from '@/src/components/profilePage/profileForm';
import Header from '@/src/components/header';

const cn = classNames.bind(styles);

const ProfilePage = () => {
  return (
    <div className={cn('container')}>
      <Header title={'닉네임 들어감'} />
      <div className={cn('secondContainer')}>
        <ProfileForm />
        <ProfileAllData />
      </div>
    </div>
  );
};

export default ProfilePage;

//프로필 편집에 프로필 이미지랑 닉네임 수정하기 만들기
