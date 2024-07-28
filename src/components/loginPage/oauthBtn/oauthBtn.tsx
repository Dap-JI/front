'use client';

import classNames from 'classnames/bind';
import styles from './oauthBtn.module.scss';
import { GoogleIcon, NaverIcon, KakaoIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import OauthPopup from '@/src/components/loginPage/oauthPopup';

const cn = classNames.bind(styles);

const OauthBtn = () => {
  const kakaoLogin = () => {
    OauthPopup('kakao');
  };

  const NaverLogin = () => {
    OauthPopup('naver');
  };

  return (
    <div className={cn('container')}>
      {/* <GoogleIcon
        width="60"
        height="60"
        className={cn('google')}
        // onClick={() => loginClick('google')}
      /> */}
      <KakaoIcon
        width="60"
        height="60"
        className={cn('kakao')}
        onClick={kakaoLogin}
      />
      <NaverIcon
        width="65"
        height="65"
        className={cn('naver')}
        onClick={NaverLogin}
      />
    </div>
  );
};

export default OauthBtn;
