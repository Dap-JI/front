'use client';
import fetchData from '@/src/utils/fetchData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProfileType, useFormProfileEditProps } from '@/src/utils/type';
import instance from '@/src/utils/axios';
import { useRouter } from 'next/navigation';

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
  });
};

export const useProfileUpdate = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['profileUpdate'],
    mutationFn: (formData: useFormProfileEditProps) =>
      instance.patch(`/api/profile/me`, formData),
    onSuccess: (updatedProfileData) => {
      queryClient.setQueryData(['profileDatas'], updatedProfileData);
      router.push('/profile');
    },
    onError: (e) => {
      console.error(e, '프로필 수정 에러');
    },
  });
};

//setQueryData는 쿼리 키를 사용하여 특정 쿼리의 캐시를 직접 업데이트합니다.
//서버에서의 응답을 기다리지 않고 클라이언트에서 즉시 데이터 변경을 반영할 수 있습니다.
