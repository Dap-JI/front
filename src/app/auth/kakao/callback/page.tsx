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
    const fetchUserKakao = async () => {
      if (code) {
        const data = await KakaoLogin(code);
        if (data) {
          if (!data.nickname) {
            router.push('/join');
            return;
          }
          router.push('/climbList');
        }
      }
    };

    fetchUserKakao();
  }, [router]);

  return (
    <div className={cn('contaienr')}>
      <Image
        src="/icon/dapjilogo.svg"
        width={200}
        height={200}
        alt="답지 메인 로고"
        priority
      />
    </div>
  );
};

export default KakaoCallback;
