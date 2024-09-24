'use client';

import classNames from 'classnames/bind';
import styles from './oauthBtnForm.module.scss';
import { NaverIcon, KakaoIcon } from '@/public/icon';
import OauthPopup from '@/src/components/loginPage/oauthPopup';
import OauthBtnStyle from '@/src/components/loginPage/oauthBtnStyle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

const OauthBtnForm = () => {
  const router = useRouter();

  const kakaoLogin = () => {
    OauthPopup('kakao');
  };

  const NaverLogin = () => {
    OauthPopup('naver');
  };

  const AppleLogin = () => {
    alert('애플로그인임!');
  };

  const DapJiLogin = () => {
    router.replace(`/signin`);
  };

  return (
    <div className={cn('container')}>
      <OauthBtnStyle
        icon={<NaverIcon width="50" height="50" />}
        text="Naver 아이디 로그인"
        backColor="#03c75a"
        textColor="white"
        onClick={NaverLogin}
      />
      <OauthBtnStyle
        icon={<KakaoIcon width="27" height="27" />}
        text="Kakao 아이디 로그인"
        backColor="#F7E600"
        textColor="black"
        onClick={kakaoLogin}
      />
      <OauthBtnStyle
        icon={
          <Image
            src={process.env.NEXT_PUBLIC_URL + `/icon/applewhitepng.png`}
            width="24"
            height="27"
            alt="애플 로고"
          />
        }
        text="Apple 아이디 로그인"
        backColor="black"
        textColor="white"
        onClick={AppleLogin}
      />
      <OauthBtnStyle
        icon={
          <Image
            src={process.env.NEXT_PUBLIC_URL + `/icon/dapjilogo.svg`}
            width="60"
            height="30"
            alt="애플 로고"
          />
        }
        text="Dap Ji 아이디 로그인"
        backColor="white"
        textColor="#38B6FF"
        onClick={DapJiLogin}
      />
    </div>
  );
};

export default OauthBtnForm;
