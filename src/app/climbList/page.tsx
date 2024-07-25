import SearchBar from '@/src/components/common/searchBar';
import classNames from 'classnames/bind';
import styles from './ClimbListPage.module.scss';
import FooterBar from '@/src/components/common/footerBar';

const cn = classNames.bind(styles);

const ClimbListPage = () => {
  return (
    <div className={cn('container')}>
      <SearchBar />
      <div>카드리스트 영역</div>
      <FooterBar />
    </div>
  );
};

export default ClimbListPage;
