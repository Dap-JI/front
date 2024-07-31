import fetchData from '@/src/utils/fetchData';
import { useQuery } from '@tanstack/react-query';
import { ClimbDetailResponseType, ClimbLIstType } from '@/src/utils/type';

type ClimbDetailProps = {
  climbListid: string;
};

//클라이밍장 리스트 데이터
export const useClimbList = () => {
  return useQuery<ClimbLIstType[]>({
    queryKey: ['climbList'],
    queryFn: () =>
      fetchData({
        param: `/api/gyms`,
      }),
  });
};

//클라이밍장 디테일 데이터
export const useClimbDetailDatas = ({ climbListid }: ClimbDetailProps) => {
  return useQuery<ClimbDetailResponseType>({
    queryKey: ['climbDetail', climbListid],
    queryFn: () =>
      fetchData({
        param: `/api/posts/gym/${climbListid}`,
      }),
  });
};

//클라이밍장 데이터 업로드 함수
