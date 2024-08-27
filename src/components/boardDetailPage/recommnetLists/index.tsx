import styles from './recommnetLists.module.scss';
import classNames from 'classnames/bind';
import { RecommentType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type RecommnetListProps = {
  recomment: RecommentType;
};

const RecommnetList = ({ recomment }: RecommnetListProps) => {
  const { recomment_idx, User, content, createdAt, comment_idx } = recomment;

  return <div>{content}</div>;
};

type RecommnetListsProps = {
  boardRcomments: RecommentType[];
};

const RecommnetLists = ({ boardRcomments }: RecommnetListsProps) => {
  
  return (
    <div>
      {boardRcomments.map((recomment) => (
        <RecommnetList key={recomment.recomment_idx} recomment={recomment} />
      ))}
    </div>
  );
};

export default RecommnetLists;
