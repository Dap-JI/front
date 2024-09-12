'use client';
import styles from './searchLists.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { userSearchDetailType } from '@/src/utils/type';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type SearchListProps = {
  list: userSearchDetailType;
};

const SearchList = ({ list }: SearchListProps) => {
  const router = useRouter();
  if (!list) return null;

  const { user_idx, nickname, img, introduce } = list;

  const profileClick = () => {
    router.push(`/profile/${user_idx}`);
  };
  return (
    <li className={cn('container')} onClick={profileClick}>
      <Image
        src={img || '/icon/icon.png'}
        width="50"
        height="50"
        alt="유저 검색 프로필 이미지"
        className={cn('profileImage')}
        priority
      />
      <div className={cn('userInfo')}>
        <span>{nickname}</span>
        <span>{introduce}</span>
      </div>
    </li>
  );
};

type SearchListsProps = {
  lists: userSearchDetailType[];
};

const SearchLists = ({ lists }: SearchListsProps) => {
  if (!lists || lists.length === 0) {
    return <p className={cn('noSearchData')}>검색 결과가 없습니다.</p>;
  }
  return (
    <ul className={cn('outerContainer')}>
      {lists.map((list: userSearchDetailType) => (
        <SearchList key={list?.user_idx} list={list} />
      ))}
    </ul>
  );
};

export default SearchLists;
