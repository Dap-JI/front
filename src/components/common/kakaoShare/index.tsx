import { KakaoIcon } from '@/public/icon';
import classNames from 'classnames/bind';
import styles from './kakaoShare.module.scss';
import { useEffect } from 'react';

const cn = classNames.bind(styles);
const KakaoShare = ({ url }: any) => {
  // const url = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleShare = () => {
    const { Kakao } = window;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'DapJi',
        description: '답지를 공유해보세요',
        imageUrl: '/icon/icon.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    });
  };

  return (
    <>
      <KakaoIcon
        className={cn('kakao')}
        width="40"
        height="40"
        onClick={handleShare}
      />
    </>
  );
};

export default KakaoShare;
