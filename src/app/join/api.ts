import instance from '@/src/utils/axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useModal } from '@/src/hooks/useModal';
import { initializeNicknameType } from '@/src/utils/type';

type UseNicknameCheckResponse = {
  data: {
    available: boolean;
    message: string;
  };
};

export const useNicknameCheck = (nickname: string, enabled: boolean) => {
  return useQuery<UseNicknameCheckResponse>({
    queryKey: ['nicknameCheck', nickname],
    queryFn: () => instance.get(`/api/check-nickname/${nickname}`),
    enabled,
    retry: 0,
  });
};

export const useInitializeNickname = () => {
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['saveNickname'],
    mutationFn: (formData: initializeNicknameType) =>
      instance.patch(`/api/profile/me`, formData),
    onSuccess: (updatedProfileData) => {
      queryClient.setQueryData(['profileDatas'], updatedProfileData);
    },
    onError: (e) => {
      console.error(e, '닉네임 설정 에러');
      showModalHandler('alert', '닉네임 설정에 실패햇어요 ');
    },
  });
};
