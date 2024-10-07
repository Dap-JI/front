'use client';
import styles from './appleCallback.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppleLogin } from '@/src/app/auth/api';

const cn = classNames.bind(styles);

const AppleCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const fetchUserApple = async () => {
      if (code) {
        const data = await AppleLogin(code);
        if (data) {
          if (!data.nickname) {
            router.replace('/join');
            return;
          }
          router.replace('/climbList');
        }
      }
    };

    fetchUserApple();
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

export default AppleCallback;
