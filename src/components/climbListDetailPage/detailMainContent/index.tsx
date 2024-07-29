import classNames from 'classnames/bind';
import styles from './detailMainContent.module.scss';

const cn = classNames.bind(styles);

const DetailMainContent = () => {
  return (
    <div className={cn('container')}>
      <div className={cn('videoWrapper')}>동영상 들어갈곳</div>
      <div className={cn('contentWrapper')}>
        <div className={cn('infoWrapper')}>
          <span>{color}</span>
          <span>{clrearday}</span>
          <span>{usename}</span>
        </div>
        <p className={cn('mainWapper')}>{content}</p>
      </div>
    </div>
  );
};

export default DetailMainContent;
