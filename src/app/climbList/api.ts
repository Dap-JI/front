import fetchData from '@/src/utils/fetchData';
import { useQuery } from '@tanstack/react-query';
import {
  DetailType,
  ClimbDetailResponseType,
  ClimbLIstType,
} from '@/src/utils/type';

type ClimbDetailProps = {
  climbListid: string;
};

export const useClimbList = () => {
  return useQuery<ClimbLIstType[]>({
    queryKey: ['climbList'],
    queryFn: () =>
      fetchData({
        param: `/api/gyms`,
      }),
  });
};

export const useClimbDetailDatas = ({ climbListid }: ClimbDetailProps) => {
  return useQuery<ClimbDetailResponseType>({
    queryKey: ['climbDetail', climbListid],
    queryFn: () =>
      fetchData({
        param: `/api/posts/gym/${climbListid}`,
      }),
  });
};
