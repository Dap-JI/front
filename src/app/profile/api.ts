'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProfileType, useFormProfileEditProps } from '@/src/utils/type';
import instance from '@/src/utils/axios';
import { useRouter } from 'next/navigation';
import { useModal } from '@/src/hooks/useModal';

type ProfileDataProps = {
  userId: any;
  page: number;
};

export const ProfileDatas = async ({ userId, page = 1 }: ProfileDataProps) => {
  const res = await instance.get(`/api/profile/${userId}`, {
    params: {
      page,
    },
  });
  return res.data;
};

export const useProfileDatas = (userId: string) => {
  return useQuery<ProfileType>({
    queryKey: ['userProfileData'],
    queryFn: () => instance.get(`/api/profile/${userId}`),
    select: (res: ProfileType) => res?.data,
  });
};

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

export const useLogout = (enabled: boolean) => {
  return useQuery<void>({
    queryKey: ['userLogout'],
    queryFn: () => instance.get(`/api/auth/logout`),
    enabled,
  });
};
//void는 성공도는 실패만 나타냄
