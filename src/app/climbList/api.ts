import fetchData from '@/src/utils/fetchData';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ClimbLIstType, useFormPostUploadProps } from '@/src/utils/type';
import { useRouter } from 'next/navigation';
import instance from '@/src/utils/axios';

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
  const res = await instance(`/api/posts/gym/${gymId}`, {
    params: {
      page: pageParam,
      color: color,
    },
  });
  return res.data;
};

//클라이밍장 디테일 데이터 업로드 함수
export const useDetailUploadDatas = (gymId: string | number) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['detailUpload'],
    mutationFn: (formData: useFormPostUploadProps) =>
      instance.post('/api/posts', formData),
    onSuccess: () => {
      router.push(`/climbList/${gymId}`);
    },
    onError: (error) => {
      console.error('업로드 실패:', error);
      alert('동영상,등반일, 난이도 선택은 필수입니다.');
    },
  });
};

//데이터 시간기준 최신순
