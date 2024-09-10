import React, { useState } from 'react';
import styles from './searchLists.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { userSearchDetailType } from '@/src/utils/type';

const cn = classNames.bind(styles);

type SearchListProps = {
  list: userSearchDetailType;
};

const SearchList = ({ list }: SearchListProps) => {
  if (!list) return null;

  const { user_idx, nickname, img, introduce } = list;
  return (
    <li className={cn('container')}>
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
      </div>
    </li>
  );
};

type SearchListsProps = {
  lists: userSearchDetailType[];
};

const SearchLists = ({ lists }: SearchListsProps) => {
  if (!lists || lists.length === 0) {
    return <p>검색 결과가 없습니다.</p>;
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
