import styles from './commonButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type CommonButtonProps = {
  name: string;
  onClick?: () => void;
  color?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
};

const CommonButton = ({
  name,
  onClick,
  color = 'white',
  type,
}: CommonButtonProps) => {
  return (
    <button
      className={cn('container')}
      style={{ backgroundColor: color }}
      onClick={onClick}
      type={type}
    >
      {name}
    </button>
  );
};

export default CommonButton;
