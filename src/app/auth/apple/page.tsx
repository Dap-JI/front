'use client';
import styles from './appleCallback.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';

const cn = classNames.bind(styles);

const AppleCallback = () => {
  const { myId } = useMyInfoStore();
  const router = useRouter();

  // useEffect(() => {
  //   const code = new URLSearchParams(window.location.search).get('code');
  //   const fetchUserKakao = async () => {
  //     if (code) {
  //       const data = await KakaoLogin(code);
  //       if (data) {
  //         if (!data.nickname) {
  //           router.replace('/join');
  //           return;
  //         }
  //         router.replace('/climbList');
  //       }
  //     }
  //   };

  //   fetchUserKakao();
  // }, [router]);

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

export default AppleCallback;
