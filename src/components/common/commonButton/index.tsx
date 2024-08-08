import styles from './commonButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type CommonButtonProps = {
  name: string;
  onClick?: () => void;
  color?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  freeStyle?: string;
};

const CommonButton = ({
  name,
  onClick,
  color = 'white',
  type,
  freeStyle,
}: CommonButtonProps) => {
  return (
    <button
      className={freeStyle ? cn(freeStyle) : cn('container')}
      style={{ backgroundColor: color }}
      onClick={onClick}
      type={type}
    >
      {name}
    </button>
  );
};

export default CommonButton;
