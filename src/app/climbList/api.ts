import fetchData from '@/src/utils/fetchData';
import { useQuery } from '@tanstack/react-query';
import { ClimbDetailResponseType, ClimbLIstType } from '@/src/utils/type';
import axios from '@/src/utils/axios';

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

//클라이밍장 데이터 업로드 함수

type ClimbDetailDatasProps = {
  pageParam: number;
  climbListid: string;
  color: string | null;
};

export const ClimbDetailDatas = async ({
  pageParam = 1,
  climbListid,
  color,
}: ClimbDetailDatasProps) => {
  const res = await axios(`/api/posts/gym/${climbListid}`, {
    params: {
      page: pageParam,
      color: color,
    },
  });
  return res.data;
};
