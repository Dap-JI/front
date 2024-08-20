import styles from './uploadPage.module.scss';
import classNames from 'classnames/bind';
import Header from '@/src/components/common/header';

const cn = classNames.bind(styles);

const BoardUploadPage = () => {
  return (
    <div className={cn('container')}>
      <Header back={true}></Header>

      <div className={cn('secondContainer')}>
        여기는 게시물 업로드 폼 들어갈거임
      </div>
    </div>
  );
};

export default BoardUploadPage;
