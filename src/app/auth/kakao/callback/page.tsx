'use client';
import React, { useEffect, useState } from 'react';
import { KakaoLogin } from '@/src/app/auth/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './kakaoCallBack.module.scss';
import { useQuery } from '@tanstack/react-query';
import { LoginUserType } from '@/src/utils/type';

const cn = classNames.bind(styles);

const KakaoCallback = () => {
  const router = useRouter();
  const code = new URLSearchParams(window.location.search).get('code');
  const [hasRedirected, setHasRedirected] = useState(false);

  const { data: userKakao, isSuccess } = useQuery({
    queryKey: ['kakaoLogin', code],
    queryFn: () => KakaoLogin(code!),
    enabled: !!code && !hasRedirected,
    select: (res: LoginUserType) => res,
  });

  const userNickname = userKakao?.nickname;

  useEffect(() => {
    if (isSuccess && !hasRedirected) {
      setHasRedirected(true);
      if (userNickname === null || userNickname === undefined) {
        router.push('/join');
        return;
      }
      router.push('/climbList');
    }
  }, [isSuccess, hasRedirected, userNickname, router]);

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
