'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProfilePostType, useFormProfileEditProps } from '@/src/utils/type';
import instance from '@/src/utils/axios';
import { useRouter } from 'next/navigation';
import { useModal } from '@/src/hooks/useModal';

type ProfileDataProps = {
  userId: string;
  page: number;
};

//프로필 유저 정보 및 동영상 썸네일
export const fethcProfilePostDatas = async ({
  userId,
  page = 1,
}: ProfileDataProps) => {
  const res = await instance.get(`/api/profile/${userId}`, {
    params: {
      page,
    },
  });
  return res.data;
};

//프로필 유저 정보 및 게시판 정보

export const fetchProfileBoardDatas = async ({
  userId,
  page = 1,
}: ProfileDataProps) => {
  const res = await instance.get(`/api/profile_board/${userId}`, {
    params: {
      page,
    },
  });
  return res.data;
};

//프로필 유저 정보 및 동영상 썸네일
export const useProfileDatas = (userId: string) => {
  return useQuery<ProfilePostType>({
    queryKey: ['userProfileData'],
    queryFn: () => instance.get(`/api/profile/${userId}`),
    select: (res: ProfilePostType) => res?.data,
  });
};

//프로필 유저 정보 업데이트
export const useProfileUpdate = (userId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['profileUpdate'],
    mutationFn: (formData: useFormProfileEditProps) =>
      instance.patch(`/api/profile/me`, formData),
    onSuccess: (updatedProfileData) => {
      queryClient.setQueryData(['profileDatas'], updatedProfileData);
      router.push(`/profile/${userId}`);
    },
    onError: (e) => {
      console.error(e, '프로필 수정 에러');
      showModalHandler('alert', '수정에 실패했어요');
    },
  });
};

//로그아웃

export const useLogout = (enabled: boolean) => {
  return useQuery<void>({
    queryKey: ['userLogout'],
    queryFn: () => instance.get(`/api/auth/logout`),
    enabled,
  });
};

//팔로워 조회

type fetchFollowDataProps = {
  page: number;
  search: string;
  userId: string | null;
};

export const fetchFollowerData = async ({
  page,
  search,
  userId,
}: fetchFollowDataProps) => {
  const res = await instance.get(`/api/followers/${userId}`, {
    params: {
      page,
      search,
    },
  });
  return res.data;
};

//팔로잉 조회

export const fetchFollowingData = async ({
  page,
  search,
  userId,
}: fetchFollowDataProps) => {
  const res = await instance.get(`/api/following/${userId}`, {
    params: {
      page,
      search,
    },
  });
  return res.data;
};

//팔로잉 실행
