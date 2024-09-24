'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NaverLogin } from '@/src/app/auth/api';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './naverCallBack.module.scss';

const cn = classNames.bind(styles);

const NaverCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const fetchUserKakao = async () => {
      if (code) {
        const data = await NaverLogin(code);
        if (data) {
          if (!data.nickname) {
            router.replace('/join');
            return;
          }
          router.replace('/climbList');
        }
      }
    };

    fetchUserKakao();
  }, [router]);

  return (
    <div className={cn('contaienr')}>
      <Image
        src={process.env.NEXT_PUBLIC_URL + '/icon/dapjilogo.svg'}
        width={200}
        height={200}
        alt="답지 메인 로고"
        priority
      />
    </div>
  );
};

export default NaverCallback;
