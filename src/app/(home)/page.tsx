import classNames from 'classnames/bind';
import styles from './HomePage.module.scss';
import OauthBtn from '@/src/components/loginPage/oauthBtn/oauthBtn';
import Link from 'next/link';

const cn = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cn('container')}>
      <h1>Dap Ji</h1>
      <div className={cn('loginContaienr')}>
        <h2>답지 보러 가기 👇</h2>
        <OauthBtn />
      </div>
      <Link href="/climbList">
        <button>들억가기</button>
      </Link>
    </div>
  );
};

export default Home;
