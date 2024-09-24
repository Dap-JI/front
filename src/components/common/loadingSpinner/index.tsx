import Image from 'next/image';
import styles from './loadingSpinner.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);
const LoadingSpinner = () => {
  return (
    <div className={cn('container')}>
      <Image
        src={process.env.NEXT_PUBLIC_URL + '/icon/spinner.gif'}
        width="100"
        height="100"
        alt="loadingSpinner"
        unoptimized
        priority
      />
    </div>
  );
};

export default LoadingSpinner;
