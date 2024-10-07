import instance from '@/src/utils/axios';

export const KakaoLogin = async (code: string | null) => {
  try {
    const res = await instance.get(`/api/auth/kakao/callback`, {
      params: {
        code: code,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e, '카카오 로그인 에러');
  }
};

export const NaverLogin = async (code: string) => {
  try {
    const res = await instance.get(`/api/auth/naver/callback`, {
      params: {
        code: code,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e, '네이버 로그인 에러');
  }
};

export const AppleLogin = async (code: string) => {
  try {
    const res = await instance.get(`/api/auth/apple/callback`, {
      params: {
        code: code,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e, '애플 로그인 에러');
  }
};

export const fetchMyInfo = async () => {
  const res = await instance.get('/api/myinfo');
  return res.data;
};
