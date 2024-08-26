// 'use client';
// import React, { useEffect } from 'react';
// import { KakaoIcon } from '@/public/icon';
// import classNames from 'classnames/bind';
// import styles from './kakaoShareBtn.module.scss';
// const cn = classNames.bind(styles);

// const KakaoShareBtn = () => {
//   useEffect(() => {
//     // 카카오 SDK를 로드합니다.
//     const script = document.createElement('script');
//     script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
//     script.integrity =
//       'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
//     script.crossOrigin = 'anonymous';
//     script.onload = () => {
//       // 카카오 SDK 초기화
//       if (!window.Kakao.isInitialized()) {
//         window.Kakao.init('c089c8172def97eb00c07217cae17495'); // 카카오 데모 키
//       }

//       // 카카오 공유 버튼 생성
//       window.Kakao.Share.createDefaultButton({
//         container: '#kakaotalk-sharing-btn',
//         objectType: 'feed',
//         content: {
//           title: '딸기 치즈 케익',
//           description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
//           imageUrl:
//             'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
//           link: {
//             mobileWebUrl: 'https://developers.kakao.com',
//             webUrl: 'https://developers.kakao.com',
//           },
//         },
//         social: {
//           likeCount: 286,
//           commentCount: 45,
//           sharedCount: 845,
//         },
//         buttons: [
//           {
//             title: '웹으로 보기',
//             link: {
//               mobileWebUrl: 'https://developers.kakao.com',
//               webUrl: 'https://developers.kakao.com',
//             },
//           },
//           {
//             title: '앱으로 보기',
//             link: {
//               mobileWebUrl: 'https://developers.kakao.com',
//               webUrl: 'https://developers.kakao.com',
//             },
//           },
//         ],
//       });
//     };
//     document.body.appendChild(script);

//     // 컴포넌트 언마운트 시 스크립트 제거
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <>
//       <a id="kakaotalk-sharing-btn" href="javascript:;">
//         <KakaoIcon className={cn('kakao')} width="40" height="40" />
//       </a>
//     </>
//   );
// };

// export default KakaoShareBtn;

'use client';
import React, { useEffect } from 'react';
import { KakaoIcon } from '@/public/icon';
import classNames from 'classnames/bind';
import styles from './kakaoShareBtn.module.scss';
import Script from 'next/script';

const cn = classNames.bind(styles);

const KakaoShareBtn = () => {
  // const url = typeof window !== 'undefined' ? window.location.href : '';
  const url = window.location.href;

  const handleShare = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: 'DapJi',
          description: '답지를 공유해보세요',
          imageUrl: '/icon/icon.png',
          link: {
            // mobileWebUrl: url,
            webUrl: url,
          },
        },
      });
    }
  };

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        crossOrigin="anonymous"
        onLoad={() => {
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
          }
        }}
      />
      <KakaoIcon
        className={cn('kakao')}
        width="40"
        height="40"
        onClick={handleShare}
      />
    </>
  );
};

export default KakaoShareBtn;
