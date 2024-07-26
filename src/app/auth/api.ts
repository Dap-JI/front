import fetchData from '@/src/utils/fetchData';

const KakaoLogin = async (code: string) => {
  try {
    await fetchData({
      param: `/api/auth/kakao/callback?code=${code}`,
    });
  } catch {
    console.error('카카오로그인 에러');
  }
};

export default KakaoLogin;
