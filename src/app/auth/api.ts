import instance from '@/src/utils/axios';
import fetchData from '@/src/utils/fetchData';
import { useQuery } from '@tanstack/react-query';

export const KakaoLogin = async (code: string) => {
  try {
    await fetchData({
      param: `/api/auth/kakao/callback?code=${code}`,
    });
  } catch (e) {
    console.error(e, '카카오 로그인 에러');
  }
};

export const NaverLogin = async (code: string) => {
  try {
    await fetchData({
      param: `/api/auth/naver/callback?code=${code}`,
    });
  } catch (e) {
    console.error(e, '네이버 로그인 에러');
  }
};

export const useMyInfo = (enabled: boolean) => {
  return useQuery({
    queryKey: ['myinfo'],
    queryFn: () => instance.get('/api/myinfo'),
    enabled,
  });
};
