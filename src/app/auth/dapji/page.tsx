'use client';
import styles from './dapjiPage.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';

const cn = classNames.bind(styles);

const Dapjipage = () => {
  const router = useRouter();
  const { myId } = useMyInfoStore();
  useEffect(() => {
    if (myId) {
      setTimeout(() => {
        router.push(`/climbList`);
      }, 2000);
      return;
    }
    router.push(`/`);
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

export default Dapjipage;
