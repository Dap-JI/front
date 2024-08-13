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
};

const Header = ({ children, title, back }: HeaderProps) => {
  const router = useRouter();

  const backClick = () => {
    router.back();
  };
  return (
    <div className={cn('container')}>
      {back === true ? <LeftArrowIcon onClick={backClick} /> : ''}
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Header;
