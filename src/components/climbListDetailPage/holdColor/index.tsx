import classNames from 'classnames/bind';
import styles from './holdColor.module.scss';
import { CheckIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type HolderColorProps = {
  color: string;
  onClick: () => void;
  active: boolean;
};

const HolderColor = ({ color, onClick, active }: HolderColorProps) => {
  return (
    <div className={cn('circle', `color-${color}`)} onClick={onClick}>
      {active && <CheckIcon className={cn('checkIcon')} />}
    </div>
  );
};

export default HolderColor;
