import classNames from 'classnames/bind';
import styles from './profileBoardData.module.scss';
import Image from 'next/image';
import { RightArrowIcon } from '@/public/icon';
import { BoardDatas } from '@/src/utils/dummy';
const cn = classNames.bind(styles);

type BoardType = {
  board_idx: number;
  user_idx: number;
  title: string;
  category: string;
  username: string;
  created_at: any;
};

type ProfileBoardDataProps = {
  list: BoardType;
};

const ProfileBoardData = ({ list }: ProfileBoardDataProps) => {
  const { title, category, username, created_at } = list;
  const deleteT = (date: string | null) => date?.split('T')[0]; 
  return (
    <div className={cn('container')}>
      <div className={cn('dot')}>🔵</div>
      <div className={cn('mainContent')}>
        <div className={cn('title')}>{title}</div>
        <div className={cn('infoWrapper')}>
          <span>{category}</span>
          <span>{username}</span>
          <span>{deleteT(created_at)}</span>
        </div>
      </div>
      <RightArrowIcon fill="black" width="20" height="20" />
    </div>
  );
};

const ProfileBoardDatas = ({ lists }: any) => {
  return (
    <div className={cn('outerContainer')}>
      {BoardDatas.map((list) => (
        <ProfileBoardData key={list.board_idx} list={list} />
      ))}
    </div>
  );
};

export default ProfileBoardDatas;
