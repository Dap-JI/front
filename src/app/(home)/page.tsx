'use client';
import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import OauthBtnForm from '@/src/components/loginPage/oauthBtnForm';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

const Home = () => {
  const router = useRouter();
  return (
    <div className={cn('container')}>
      <h1>Dap Ji</h1>
      <div className={cn('loginContaienr')}>
        <OauthBtnForm />
      </div>
      <span
        className={cn('loginClick')}
        onClick={() => router.replace(`/signin`)}
      >
        🤫
      </span>
    </div>
  );
};

export default Home;
