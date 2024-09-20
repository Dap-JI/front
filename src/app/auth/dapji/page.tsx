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
    router.replace(`/`);
  }, []);
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

export default Dapjipage;
