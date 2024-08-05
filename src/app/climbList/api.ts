import fetchData from '@/src/utils/fetchData';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ClimbLIstType,
  ClimbLIstTypes,
  useFormPostUploadProps,
  PostDetailDataType,
} from '@/src/utils/type';
import { useRouter } from 'next/navigation';
import instance from '@/src/utils/axios';

type ClimbDetailProps = {
  gymId: string;
};

//클라이밍장 리스트 데이터 조회 함수
export const useClimbList = () => {
  return useQuery<ClimbLIstTypes>({
    queryKey: ['climbList'],
    queryFn: () =>
      fetchData({
        param: `/api/gyms`,
      }),
  });
};

//클라이밍장 포스트 데이터 조회 함수

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

//클라이밍장 포스트 데이터 업로드 함수
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

// 클라이밍장 포스트의 디테일 함수 `/api/posts/${postId}`

export const usePostDetailDatas = (postid: string) => {
  return useQuery({
    queryKey: ['postDetailDatas', postid],
    queryFn: () => instance.get(`/api/posts/${postid}`),
    select: (res: any) => res.data,
  });
};

//클라이밍장 포스트 수정 함수  `/api/posts/${postid}`
export const usePostDetailUpdate = (postid: string, gymId: string) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['postDetailUpdate'],
    mutationFn: (formData: useFormPostUploadProps) =>
      instance.patch(`/api/posts/${postid}`, formData),
    onSuccess: () => {
      router.push(`/climbList/${gymId}`);
    },
    onError: (error) => {
      console.error('수정 실패:', error);
    },
  });
};

//클라이밍장 포스트 삭제 함수 `/api/posts/${postid}`
export const usePostDetailDelete = (postid: string, gymId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['postDetailDelete'],
    mutationFn: () => instance.delete(`/api/posts/${postid}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbList'] });
      router.push(`/climbList/${gymId}`);
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });
};
