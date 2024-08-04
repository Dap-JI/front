import fetchData from '@/src/utils/fetchData';
import { useQuery } from '@tanstack/react-query';
import { ProfileType } from '@/src/utils/type';
import { useProfileStore } from '@/src/utils/store/useProfileStore';

// export const useProfileDatas = () => {
//   return useQuery<ProfileType>({
//     queryKey: ['profileDatas'],
//     queryFn: () => fetchData({ param: `/api/user/profile` }),
//   });
// };

export const useProfileDatas = (userId?: string) => {
  return useQuery<ProfileType>({
    queryKey: ['profileDatas', userId],
    queryFn: () => {
      const apiUrl = userId
        ? `/api/user/profile/${userId}`
        : `/api/user/profile`;
      return fetchData({ param: apiUrl });
    },
  });
};

