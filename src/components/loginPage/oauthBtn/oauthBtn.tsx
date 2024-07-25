'use client';

import classNames from 'classnames/bind';
import styles from './oauthBtn.module.scss';
import { GoogleIcon, NaverIcon, KakaoIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

const OauthBtn = () => {
  const router = useRouter();
  const loginClick = (oauth: string) => {
    alert(`${oauth} 로그인!`);
    router.push('/climbList');
  };

  return (
    <div className={cn('container')}>
      <GoogleIcon
        width="60"
        height="60"
        className={cn('google')}
        onClick={() => loginClick('google')}
      />
      <KakaoIcon
        width="60"
        height="60"
        className={cn('kakao')}
        onClick={() => loginClick('kakao')}
      />
      <NaverIcon
        width="65"
        height="65"
        className={cn('naver')}
        onClick={() => loginClick('naver')}
      />
    </div>
  );
};

export default OauthBtn;
