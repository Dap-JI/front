'use client';

import classNames from 'classnames/bind';
import styles from './oauthBtn.module.scss';
import { GoogleIcon, NaverIcon, KakaoIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import OauthPopup from '@/src/components/loginPage/oauthPopup';
import { useEffect } from 'react';

const cn = classNames.bind(styles);

const OauthBtn = () => {
  const router = useRouter();

  const loginClick = () => {
    // window.open(
    //   `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`,
    // );
    window.open('http://localhost:3001/api/auth/kakao');
  };

  // const kakaoLogin = () => {
  //   OauthPopup('kakao');
  // };

  return (
    <div className={cn('container')}>
      <GoogleIcon
        width="60"
        height="60"
        className={cn('google')}
        // onClick={() => loginClick('google')}
      />
      <KakaoIcon
        width="60"
        height="60"
        className={cn('kakao')}
        onClick={loginClick}
      />
      <NaverIcon
        width="65"
        height="65"
        className={cn('naver')}
        // onClick={() => loginClick('naver')}
      />
    </div>
  );
};

export default OauthBtn;

// 'use client';

// import classNames from 'classnames/bind';
// import styles from './oauthBtn.module.scss';
// import { GoogleIcon, NaverIcon, KakaoIcon } from '@/public/icon';
// import { useRouter } from 'next/navigation';
// import OauthPopup from '@/src/components/loginPage/oauthPopup';
// import { useEffect } from 'react';

// const cn = classNames.bind(styles);

// const OauthBtn = () => {
//   const router = useRouter();

//   const kakaoLogin = () => {
//     OauthPopup('kakao');
//   };

//   return (
//     <div className={cn('container')}>
//       <GoogleIcon
//         width="60"
//         height="60"
//         className={cn('google')}
//         // onClick={() => loginClick('google')}
//       />
//       <KakaoIcon
//         width="60"
//         height="60"
//         className={cn('kakao')}
//         onClick={kakaoLogin}
//       />
//       <NaverIcon
//         width="65"
//         height="65"
//         className={cn('naver')}
//         // onClick={() => loginClick('naver')}
//       />
//     </div>
//   );
// };

// export default OauthBtn;
