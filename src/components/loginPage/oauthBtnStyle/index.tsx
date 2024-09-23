import styles from './oauthBtnStyle.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

type OauthBtnStyleProps = {
  text: string;
  icon: React.ReactNode;
  backColor: string;
  onClick: () => void;
  textColor: string;
};

const OauthBtnStyle = ({
  text,
  icon,
  backColor,
  onClick,
  textColor,
}: OauthBtnStyleProps) => {
  return (
    <button
      className={cn('container')}
      style={{ backgroundColor: backColor }}
      onClick={onClick}
    >
      <div className={cn('icon')}>{icon}</div>
      <p className={cn('text')} style={{ color: textColor }}>
        {text}
      </p>
    </button>
  );
};

export default OauthBtnStyle;
