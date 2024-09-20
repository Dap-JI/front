'use client';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import { LeftArrowIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type HeaderProps = {
  children?: React.ReactNode;
  title?: string;
  back?: boolean;
  page?: string;
};

const Header = ({ children, title, back, page }: HeaderProps) => {
  const router = useRouter();

  const backClick = () => {
    router.back();
  };

  const pageMove = () => {
    if (page) {
      router.replace(page);
    }
  };

  return (
    <div className={cn('container')}>
      {back === true ? <LeftArrowIcon onClick={backClick} /> : ''}
      {page ? <LeftArrowIcon onClick={pageMove} /> : ''}
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Header;
