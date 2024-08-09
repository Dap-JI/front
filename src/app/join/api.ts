import instance from '@/src/utils/axios';
import { useQuery } from '@tanstack/react-query';

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

