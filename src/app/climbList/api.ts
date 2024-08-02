import fetchData from '@/src/utils/fetchData';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ClimbLIstType, useFormProps } from '@/src/utils/type';
import axios from '@/src/utils/axios';

type ClimbDetailProps = {
  gymId: string;
};

//클라이밍장 리스트 데이터 조회 함수
export const useClimbList = () => {
  return useQuery<ClimbLIstType[]>({
    queryKey: ['climbList'],
    queryFn: () =>
      fetchData({
        param: `/api/gyms`,
      }),
  });
};

//클라이밍장 디테일 데이터 조회 함수

type ClimbDetailDatasProps = {
  pageParam: number;
  gymId: string;
  color: string | null;
};

export const ClimbDetailDatas = async ({
  pageParam = 1,
  gymId,
  color,
}: ClimbDetailDatasProps) => {
  const res = await axios(`/api/posts/gym/${gymId}`, {
    params: {
      page: pageParam,
      color: color,
    },
  });
  return res.data;
};

//클라이밍장 디테일 데이터 업로드 함수
export const useDetailUploadDatas = () => {
  return useMutation({
    mutationKey: ['detailUpload'],
    mutationFn: (formData: useFormProps) => axios.post('/api/posts', formData),
    onSuccess: () => {
      console.log('성공적으로 업로드됨:');
    },
    onError: (error) => {
      console.error('업로드 실패:', error);
    },
  });
};
