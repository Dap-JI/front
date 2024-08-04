'use client';
import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';
import ProfileAllData from '@/src/components/profilePage/profileAllData';
import ProfileForm from '@/src/components/profilePage/profileForm';
import Header from '@/src/components/header';
import { useProfileDatas } from './api';

const cn = classNames.bind(styles);

const ProfilePage = () => {
  const { data: profileData } = useProfileDatas();

  const title = profileData?.user.nickname ?? '';
  const profileInfo = profileData?.user ?? {
    nickname: '',
    img: '',
    introduce: null,
    provider: '',
  };
  const profilePost = profileData?.posts ?? [];

  return (
    <div className={cn('container')}>
      <Header title={title} />
      <div className={cn('secondContainer')}>
        <ProfileForm lists={profileInfo} />
        <ProfileAllData lists={profilePost} />
      </div>
    </div>
  );
};

export default ProfilePage;

//프로필 편집에 프로필 이미지랑 닉네임 수정하기 만들기
//세션 사용하는거는 자기 자신 세션 확인해서 서버에서 내려줘야할듯
//userId를 프론트에서 패스파람으로 받는건 프론트에서 자기 세션 id확인할 수 없어서 못함
