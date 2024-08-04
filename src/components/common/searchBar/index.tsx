import classNames from 'classnames/bind';
import styles from './searchBar.module.scss';
import CommonInput from '@/src/components/common/commonInput';
import { GlassIcon } from '@/public/icon';

const cn = classNames.bind(styles);

const SearchBar = () => {
  return (
    <form className={cn('container')}>
      <CommonInput
        placeholder="검색어를 입력하세요"
        suffix={<GlassIcon width="15" height="15" className={cn('glass')} />}
        type="text"
      />
    </form>
  );
};

export default SearchBar;
