import classNames from 'classnames/bind';
import styles from './holdColor.module.scss';

const cn = classNames.bind(styles);

type HolderColorProps = {
  color: string;
};

const HolderColor = ({ color }: HolderColorProps) => {
  return <div className={cn('container', `color-${color}`)}></div>;
};

export default HolderColor;
