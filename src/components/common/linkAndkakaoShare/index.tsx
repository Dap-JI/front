import { useState, useEffect, useRef } from 'react';
import LinkSahreBtn from './linkShareBtn';
import KakaoShareBtn from './kakaoShareBtn';
import classNames from 'classnames/bind';
import styles from './linkAndKakaoShare.module.scss';
import { ShareIcon } from '@/public/icon';

const cn = classNames.bind(styles);

type LinkAndKakaoShareProps = {
  params: { postid: string; gymId: string };
};

const LinkAndKakaoShare = ({ params }: LinkAndKakaoShareProps) => {
  const [visible, setVisible] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const showDropdown = () => {
    setVisible(!visible);
  };

  const handleRefClick = (e: MouseEvent) => {
    if (dropDownRef && !dropDownRef.current?.contains(e.target as Node)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener('click', handleRefClick);
      return;
    }
    document.removeEventListener('click', handleRefClick);

    return () => {
      document.removeEventListener('click', handleRefClick);
    };
    //메모리 누수 방지 및 이벤트 리스너 중첩 방지
  }, [visible]);

  return (
    <div className={cn('contaienr')} ref={dropDownRef}>
      <ShareIcon onClick={showDropdown} />
      <div className={cn('shareBtn', { visible })}>
        <LinkSahreBtn params={params} />
        <KakaoShareBtn />
      </div>
    </div>
  );
};

export default LinkAndKakaoShare;
