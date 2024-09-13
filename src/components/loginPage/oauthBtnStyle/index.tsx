import styles from './oauthBtnStyle.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type OauthBtnStyleProps = {
  text: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
};

const OauthBtnStyle = ({ text, icon, color, onClick }: OauthBtnStyleProps) => {
  return (
    <button
      className={cn('container')}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <div className={cn('icon')}>{icon}</div>
      <p className={cn('text')}>{text}</p>
    </button>
  );
};

export default OauthBtnStyle;
