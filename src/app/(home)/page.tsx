'use client';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import OauthBtnForm from '@/src/components/loginPage/oauthBtnForm';
import Image from 'next/image';

const cn = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cn('container')}>
      <Image
        src={process.env.NEXT_PUBLIC_URL + `/icon/dapjilogo.svg`}
        width={300}
        height={200}
        alt="답지 메인 로고"
        priority
      />
      <div className={cn('loginContaienr')}>
        <OauthBtnForm />
      </div>
    </div>
  );
};

export default Home;
