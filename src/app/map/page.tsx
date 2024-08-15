import React from 'react';
import classNames from 'classnames/bind';
import styles from './mapPage.module.scss';
const cn = classNames.bind(styles);

const NaverMapPage = () => {
  return (
    <div className={cn('container')}>
      헤더
      <div className={cn('secondContainer')}>바디</div>
    </div>
  );
};

export default NaverMapPage;
