'use client';
import styles from './footerBar.module.scss';
import classNames from 'classnames/bind';
import { HomeIcon, BordIcon, UserIcon, MarkerIcon } from '@/public/icon';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchMyInfo } from '@/src/app/auth/api';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { GlassIcon } from '@/public/icon';
import { useEffect } from 'react';

const cn = classNames.bind(styles);

const FooterBar = () => {
  const path = usePathname();
  const router = useRouter();
  const { myId, setmyId } = useMyInfoStore();

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const data = await fetchMyInfo();
        setmyId(data);
      } catch (error) {
        console.error('my info error', error);
      }
    };

    if (
      path !== '/' &&
      path !== '/join' &&
      path !== '/signin' &&
      path !== '/signup' &&
      !myId
    ) {
      getMyInfo();
    }
  }, [path, setmyId, myId]);

  const profileClick = () => {
    if (myId) {
      router.push(`/profile/${myId}`);
    }
  };

  const routerClick = (page: string) => {
    router.push(`/${page}`);
  };
  const isClimbListSpecificPostPath = path.match(/^\/climbList\/\d+\/\d+$/);

  if (
    path === '/' ||
    path === '/join' ||
    path.startsWith('/auth') ||
    (path.startsWith('/board') && path !== '/board') ||
    isClimbListSpecificPostPath ||
    path === '/signup' ||
    path === '/signin'
  ) {
    return null;
  }

  return (
    <div className={cn('container')}>
      <BordIcon
        width="30"
        height="30"
        onClick={() => routerClick('board')}
        fill="balck"
      />
      <Link href="/climbList">
        <HomeIcon width="30" height="30" fill="balck" />
      </Link>
      <GlassIcon
        width="30"
        height="30"
        onClick={() => routerClick('search')}
        fill="balck"
      />
      <UserIcon width="30" height="30" onClick={profileClick} fill="balck" />
    </div>
  );
};

export default FooterBar;
