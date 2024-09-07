import instance from '@/src/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { useEffect } from 'react';

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

export const fetchMyInfo = async () => {
  const res = await instance.get('/api/myinfo');
  return res.data;
};
