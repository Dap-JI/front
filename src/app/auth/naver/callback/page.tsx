'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NaverLogin } from '@/src/app/auth/api';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './naverCallBack.module.scss';
import { useQuery } from '@tanstack/react-query';
import { LoginUserType } from '@/src/utils/type';

const cn = classNames.bind(styles);

const NaverCallback = () => {
  const router = useRouter();
  const code = new URLSearchParams(window.location.search).get('code');
  const [hasRedirected, setHasRedirected] = useState(false);

  const { data: userNaver, isSuccess } = useQuery({
    queryKey: ['naverLogin ', code],
    queryFn: () => NaverLogin(code!),
    enabled: !!code && !hasRedirected,
    select: (res: LoginUserType) => res,
  });

  const userNickname = userNaver?.nickname;
  console.log(userNaver);
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

export default NaverCallback;
