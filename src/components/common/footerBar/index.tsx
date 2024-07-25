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

const cn = classNames.bind(styles);

const FooterBar = () => {
  const routerClick = (page: string) => {
    alert(`${page}페이지 이동`);
  };
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
      <UserIcon width="30" height="30" onClick={() => routerClick('프로필')} />
    </div>
  );
};

export default FooterBar;
