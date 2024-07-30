'use client';

import classNames from 'classnames/bind';
import styles from './oauthBtnForm.module.scss';
import { NaverIcon, KakaoIcon } from '@/public/icon';
import OauthPopup from '@/src/components/loginPage/oauthPopup';
import OauthBtnStyle from '@/src/components/loginPage/oauthBtnStyle';

const cn = classNames.bind(styles);

const OauthBtnForm = () => {
  const kakaoLogin = () => {
    OauthPopup('kakao');
  };

  const NaverLogin = () => {
    OauthPopup('naver');
  };

  return (
    <div className={cn('container')}>
      <OauthBtnStyle
        icon={<NaverIcon width="50" height="50" />}
        text="네이버 아이디로 로그인"
        color="#03c75a;"
        onClick={NaverLogin}
      />
      <OauthBtnStyle
        icon={<KakaoIcon width="27" height="27" />}
        text="카카오 아이디로 로그인"
        color="#F7E600"
        onClick={kakaoLogin}
      />
    </div>
  );
};

export default OauthBtnForm;
