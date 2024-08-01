import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import ProfileData from '@/src/components/profilePage/profileData';
import ProfileForm from '@/src/components/profilePage/profileForm';
import Header from '@/src/components/header';

const cn = classNames.bind(styles);

const ProfilePage = () => {
  return (
    <div className={cn('container')}>
      <Header title={'닉네임 들어감'} />
      <div className={cn('secondContainer')}>
        <ProfileForm />
        <ProfileData />
      </div>
    </div>
  );
};

export default ProfilePage;
