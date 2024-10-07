import useProgressStore from '@/src/utils/store/useProgressStore';
import styles from './progressBar.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const ProgressBar = () => {
  const { progress, setProgress } = useProgressStore();

  return (
    <div className={cn('progressWrapper')}>
      <div className={cn('linearProgressBar')}>
        <div className={cn('progressBar')} style={{ width: `${progress}%` }} />
      </div>
      <span className={cn('progressText')}>{progress}%</span>
    </div>
  );
};

export default ProgressBar;
