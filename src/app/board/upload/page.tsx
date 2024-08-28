import styles from './uploadPage.module.scss';
import classNames from 'classnames/bind';
import Header from '@/src/components/common/header';
import BoardUploadForm from '@/src/components/boardUploadPage/boardUploadForm';

const cn = classNames.bind(styles);

type BoardUploadPageProsp = {
  params: {
    boardId: string;
  };
};

const BoardUploadPage = ({ params }: BoardUploadPageProsp) => {

  return (
    <div className={cn('container')}>
      <Header page={`/board`}></Header>
      <div className={cn('secondContainer')}>
        <BoardUploadForm params={params} />
      </div>
    </div>
  );
};

export default BoardUploadPage;
