import styles from './boardDetailEditPage.module.scss';
import classNames from 'classnames/bind';
import Header from '@/src/components/common/header';
import BoardUploadForm from '@/src/components/boardUploadPage/boardUploadForm';

const cn = classNames.bind(styles);

type BoardEditPageProps = {
  params: {
    boardId: string;
  };
};

const BoardEditPage = ({ params }: BoardEditPageProps) => {
  return (
    <div className={cn('container')}>
      <Header back={true}></Header>
      <div className={cn('secondContainer')}>
        <BoardUploadForm params={params} />
      </div>
    </div>
  );
};

export default BoardEditPage;
