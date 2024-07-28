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
    if (code) {
      NaverLogin(code);
      router.push('/climbList');
    }
  }, []);

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

export default NaverCallback;
