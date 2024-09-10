import classNames from 'classnames/bind';
import styles from './noticeLists.module.scss';
import LinkifyText from '@/src/hooks/useLinkifyText';
import { noticeDataType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type NoticeListProps = {
  noticeDatas: noticeDataType;
};

const NoticeLists = ({ noticeDatas }: NoticeListProps) => {
  const { title, content, createdAt } = noticeDatas;
  const deleteT = (date: string | null) => date?.split('T')[0];
  return (
    <div className={cn('container')}>
      <header>
        <span>{deleteT(createdAt)}</span>
        <h1>{title}</h1>
      </header>
      <pre className={cn('contentWrapper')}>
        <LinkifyText text={content} />
      </pre>
    </div>
  );
};

export default NoticeLists;
