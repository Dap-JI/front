import styles from './commonButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type CommonButtonProps = {
  name: string;
  onClick?: () => void;
  color?: string;
};

const CommonButton = ({
  name,
  onClick,
  color = 'white',
}: CommonButtonProps) => {
  return (
    <button
      className={cn('container')}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default CommonButton;
