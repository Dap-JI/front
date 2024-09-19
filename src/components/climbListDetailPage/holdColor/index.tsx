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
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 새로고침 동작 방지
    onClick(); // 클릭 시 필터링 처리
  };

  return (
    <div className={cn('circle', `color-${color}`)} onClick={handleClick}>
      {active && <CheckIcon className={cn('checkIcon')} />}
    </div>
  );
};

export default HolderColor;
