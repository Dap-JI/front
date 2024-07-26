'use client';
import React, { useEffect } from 'react';
import KakaoLogin from '@/src/app/auth/api';
import { useRouter } from 'next/navigation';

const Kakao = () => {
  const router = useRouter();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      KakaoLogin(code);
      router.push('/climbList');
    }
  }, []);

  return <div>Kakao</div>;
};

export default Kakao;
