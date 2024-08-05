import React from 'react';
import styles from './postDetailForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);
const PostDetailForm = () => {
  return (
    <div className={cn('container')}>
      <div className={cn('infoWrapper')}>
        <div className={cn('color')} />
        <span>2024-05-05</span>
        <span>박지용</span>
        {/* <DoubleRightArrowIcon onClick={postDetailPage} /> */}
      </div>
      <div className={cn('videoWrapper')}>
        <video
          src={'/icon/long.mp4'}
          autoPlay
          muted
          controls
          playsInline
          controlsList="nodownload"
        />
      </div>

      <p>gdgd</p>
    </div>
  );
};

export default PostDetailForm;
