import SearchBar from '@/src/components/common/searchBar';
import classNames from 'classnames/bind';
import styles from './ClimbListPage.module.scss';
import FooterBar from '@/src/components/common/footerBar';
import CardListData from '@/src/components/climbListPage/cardListData';

const cn = classNames.bind(styles);

const ClimbListPage = () => {
  return (
    <div className={cn('container')}>
      <SearchBar />
      <CardListData />
      <FooterBar />
    </div>
  );
};

export default ClimbListPage;
