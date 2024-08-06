'use client';
import styles from './footerBar.module.scss';
import classNames from 'classnames/bind';
import {
  HomeIcon,
  BordIcon,
  UserIcon,
  MarkerIcon,
  MegaPhoneIcon,
} from '@/public/icon';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMyInfo } from '@/src/app/auth/api';
import { useState, useEffect } from 'react';

const cn = classNames.bind(styles);

const FooterBar = () => {
  const path = usePathname();
  const router = useRouter();
  const [fetchProfile, setFetchProfile] = useState(false);

  const { data: myInfoData } = useMyInfo(fetchProfile);
  const userId = myInfoData?.data;

  useEffect(() => {
    if (userId) {
      router.push(`/profile/${userId}`);
    }
  }, [userId, router]);

  const routerClick = (page: string) => {
    router.push(`/${page}`);
  };

  const profileClick = () => {
    setFetchProfile(true);
  };

  // 이 클릭을 했을 때만 myinfo함수 실행 -> useEffect함수 실행 -> 프로필 페이지 이동

  if (path === '/' || path.startsWith('/auth')) {
    return null;
  }

  return (
    <div className={cn('container')}>
      <MarkerIcon width="30" height="30" onClick={() => routerClick('지도')} />
      <BordIcon width="30" height="30" onClick={() => routerClick('게시판')} />
      <Link href="/climbList">
        <HomeIcon width="30" height="30" />
      </Link>
      <MegaPhoneIcon
        width="30"
        height="30"
        onClick={() => routerClick('공지')}
      />
      <UserIcon width="30" height="30" onClick={profileClick} />
    </div>
  );
};

export default FooterBar;
//profile/userid
