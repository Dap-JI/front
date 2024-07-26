import fetchData from '@/src/utils/fetchData';

const KakaoLogin = async (code: string) => {
  try {
    await fetchData({
      param: `/api/auth/kakao/callback?code=${code}`,
    });
    // if (window.opener) {
    //   window.opener.location.href = '/climbList';
    //   window.close();
    //   return;
    // }
  } catch (e) {
    console.error(e, '카카오로그인 에러');
  }
};

export default KakaoLogin;
