'use client';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import OauthBtnForm from '@/src/components/loginPage/oauthBtnForm';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const cn = classNames.bind(styles);

const Home = () => {
  const router = useRouter();
  return (
    <div className={cn('container')}>
      <Image
        src="/icon/dapjilogo.svg"
        width={300}
        height={300}
        alt="답지 메인 로고"
      />
      <div className={cn('loginContaienr')}>
        <OauthBtnForm />
      </div>
    </div>
  );
};

export default Home;
