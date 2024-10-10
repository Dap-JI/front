'use client';
import classNames from 'classnames/bind';
import styles from './anonymousToggle.module.scss';
import { useState } from 'react';

const cn = classNames.bind(styles);

const AnonymousToggle = () => {
  const [isAnonymous, setIsAnonymous] = useState(true);

  const anonymousClick = () => {
    setIsAnonymous((prev) => !prev);
    console.log(isAnonymous);
  };

  return (
    <div className={cn('container')}>
      <div
        className={cn('isAnonymousBtnWrapper', { isAnonymous })}
        onClick={anonymousClick}
      >
        <div className={cn('isAnonymousBtn')} />
      </div>
      <span className={cn('isAnonymousText', { isAnonymous })}>익명</span>
    </div>
  );
};

export default AnonymousToggle;

//button 으로 하니 폼 제출됨
//div 변경
