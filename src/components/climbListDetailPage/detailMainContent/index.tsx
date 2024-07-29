import classNames from 'classnames/bind';
import styles from './detailMainContent.module.scss';
import {
  contentDetailData,
  ContentDetailProps,
  ContentDetail,
} from '@/src/utils/dummy';
import { DoubleRightArrowIcon } from '@/public/icon';

const cn = classNames.bind(styles);

const DetailMainContent = ({ list }: ContentDetailProps) => {
  const { color, usename, clearday, content } = list;
  return (
    <div className={cn('container')}>
      <div className={cn('infoWrapper')}>
        <div className={cn('color', `color-${color}`)} />
        <span>{clearday}</span>
        <span>{usename}</span>
        <DoubleRightArrowIcon />
      </div>
      <div className={cn('videoWrapper')}>
        <video src="/icon/long.mp4" autoPlay muted controls playsInline />
      </div>
      <p>{content}</p>
    </div>
  );
};

export default DetailMainContent;

type DetailMainContentListProps = {
  lists?: ContentDetailProps[];
};

export const DetailMainContentList = ({
  lists,
}: DetailMainContentListProps) => {
  return (
    <div className={cn('listContainer')}>
      {contentDetailData.map((list) => (
        <DetailMainContent key={list.post_idx} list={list} />
      ))}
    </div>
  );
};
