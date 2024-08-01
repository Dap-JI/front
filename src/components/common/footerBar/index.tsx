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

const cn = classNames.bind(styles);

const FooterBar = () => {
  const path = usePathname();
  const router = useRouter();

  const routerClick = (page: string) => {
    // alert(`${page}페이지 이동`);
    router.push(`/${page}`);
  };

  if (path === '/' || path.startsWith('/auth')) {
    return null;
  }

  return (
    <div className={cn('container')}>
      <MarkerIcon width="30" height="30" onClick={() => routerClick('지도')} />
      <BordIcon width="30" height="30" onClick={() => routerClick('게시판')} />
      <HomeIcon width="30" height="30" onClick={() => routerClick('홈')} />
      <MegaPhoneIcon
        width="30"
        height="30"
        onClick={() => routerClick('공지')}
      />
      <Link href="/profile">
        <UserIcon width="30" height="30" />
      </Link>
    </div>
  );
};

export default FooterBar;
