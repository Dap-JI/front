import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import OauthBtnForm from '@/src/components/loginPage/oauthBtnForm';
import Link from 'next/link';

const cn = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cn('container')}>
      <h1>Dap Ji</h1>
      <div className={cn('loginContaienr')}>
        <h2>답지 보러 가기 👇</h2>
        <OauthBtnForm />
      </div>
      <Link href="/climbList">
        <button>들어가기</button>
      </Link>
    </div>
  );
};

export default Home;
