'use client';
import React, { useEffect } from 'react';
import { KakaoLogin } from '@/src/app/auth/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './kakaoCallBack.module.scss';

const cn = classNames.bind(styles);

const KakaoCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      KakaoLogin(code);
      router.push('/climbList');
    }
  }, [router]);

  return (
    <div className={cn('contaienr')}>
      <Image
        src="/pwaIcons/icon-192x192.png"
        width="200"
        height="200"
        alt="로고"
        priority
      />
    </div>
  );
};

export default KakaoCallback;
