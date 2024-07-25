import classNames from 'classnames/bind';
import styles from './page.module.scss';
import OauthBtn from '@/src/components/loginPage/oauthBtn/oauthBtn';

const cn = classNames.bind(styles);

const Home = () => {
  return (
    <div className={cn('container')}>
      <h1>Dap Ji</h1>
      <div className={cn('loginContaienr')}>
        <h2>답지 보러 가기 👉</h2>
        <OauthBtn />
      </div>
    </div>
  );
};

export default Home;
