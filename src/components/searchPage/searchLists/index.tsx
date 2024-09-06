import React, { useState } from 'react';
import styles from './searchLists.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';

const cn = classNames.bind(styles);

const SearchList = () => {
  return (
    <li className={cn('container')}>
      <Image
        src={'/icon/icon.png'}
        width="50"
        height="50"
        alt="유저 검색 프로필 이미지"
        className={cn('profileImage')}
        priority
      />
      <div className={cn('userInfo')}>
        <span>111</span>
      </div>
    </li>
  );
};

const SearchLists = () => {
  return (
    <ul className={cn('outerContainer')}>
      <SearchList />
    </ul>
  );
};

export default SearchLists;
