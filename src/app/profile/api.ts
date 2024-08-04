import fetchData from '@/src/utils/fetchData';
import { useQuery } from '@tanstack/react-query';
import { ProfileType } from '@/src/utils/type';

export const useProfileDatas = () => {
  return useQuery<ProfileType>({
    queryKey: ['profileDatas'],
    queryFn: () => fetchData({ param: `/api/user/profile` }),
  });
};
