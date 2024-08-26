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
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { GlassIcon } from '@/public/icon';

const cn = classNames.bind(styles);

const FooterBar = () => {
  const path = usePathname();
  const router = useRouter();
  const { myId } = useMyInfoStore();

  useMyInfo();

  const routerClick = (page: string) => {
    router.push(`/${page}`);
  };

  const profileClick = () => {
    if (myId) {
      router.push(`/profile/${myId}`);
    }
  };

  if (path === '/' || path === '/join' || path.startsWith('/auth')) {
    return null;
  }

  return (
    <div className={cn('container')}>
      <MarkerIcon width="30" height="30" onClick={() => routerClick('map')} />
      <BordIcon width="30" height="30" onClick={() => routerClick('board')} />
      <Link href="/climbList">
        <HomeIcon width="30" height="30" />
      </Link>
      <GlassIcon
        width="30"
        height="30"
        onClick={() => routerClick('search')}
        fill="white"
      />
      <UserIcon width="30" height="30" onClick={profileClick} />
    </div>
  );
};

export default FooterBar;
//profile/userid
// 유저 종류도 넣어서 권한에 따라 nav바 관리자면 5개로 (관리자페이지)
