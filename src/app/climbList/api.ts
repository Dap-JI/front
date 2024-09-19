import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  useFormPostUploadProps,
  useFormListUploadProps,
} from '@/src/utils/type';
import { useRouter } from 'next/navigation';
import instance from '@/src/utils/axios';
import { useModal } from '@/src/hooks/useModal';

type ClimbListProps = {
  page: number;
  search: string;
};

//클라이밍장 리스트 조회 함수
export const ClimbListDatas = async ({ page = 1, search }: ClimbListProps) => {
  const res = await instance.get(`/api/gyms`, {
    params: {
      page,
      search,
    },
  });
  return res.data;
};
//클라이밍장 리스트 상세 조회 함수
export const useClimbListDetails = (gymId: string) => {
  return useQuery({
    queryKey: ['climbListDetails', gymId],
    queryFn: () => instance.get(`/api/gyms/${gymId}`),
    select: (res: any) => res.data,
  });
};

//클라이밍장 리스트 업로드 함수
export const useClimbListDatasUpload = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();
  return useMutation({
    mutationKey: ['climbListUpload'],
    mutationFn: (formData: useFormListUploadProps) =>
      instance.post(`/api/gyms`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbList'] });
      router.push(`/admin/list`);
    },
    onError: (error) => {
      console.error('업로드 실패:', error);
      showModalHandler('alert', '업로드에 실패했어요');
    },
  });
};

//클라이밍장 리스트 삭제 함수
export const useClimbListDatasDelete = (gymId: number) => {
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['climbListDelete'],
    mutationFn: () => instance.delete(`/api/gyms/${gymId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbList'] });
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      showModalHandler('alert', '삭제에 실패했어요');
    },
  });
};
//클라이밍장 리스트 수정 함수
export const useClimbListDataUpdate = (gymId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['climbListUpdate'],
    mutationFn: (formData: useFormListUploadProps) =>
      instance.patch(`/api/gyms/${gymId}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbList'] });
      router.push(`/admin/list`);
    },
    onError: (error) => {
      console.error('수정 실패:', error);
      showModalHandler('alert', '수정에 실패했어요');
    },
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
      color,
    },
  });
  return res.data;
};

//클라이밍장 포스트 데이터 업로드 함수
export const useDetailUploadDatas = (gymId: string | number) => {
  const router = useRouter();
  const { showModalHandler } = useModal();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['detailUpload'],
    mutationFn: (formData: useFormPostUploadProps) =>
      instance.post('/api/posts', formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfileData'] });

      router.push(`/climbList/${gymId}`);
    },
    onError: () => {
      showModalHandler('alert', '동영상,등반일, 난이도 선택은 필수에요.');
    },
  });
};

// 클라이밍장 포스트의 디테일 함수 

export const usePostDetailDatas = (postid: string) => {
  return useQuery({
    queryKey: ['postDetailDatas', postid],
    queryFn: () => instance.get(`/api/posts/${postid}`),
    select: (res: any) => res.data,
  });
};

//클라이밍장 포스트 수정 함수  
export const usePostDetailUpdate = (postid: string, gymId: string) => {
  const router = useRouter();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['postDetailUpdate'],
    mutationFn: (formData: useFormPostUploadProps) =>
      instance.patch(`/api/posts/${postid}`, formData),
    onSuccess: () => {
      router.push(`/climbList/${gymId}/${postid}`);
    },
    onError: () => {
      showModalHandler('alert', '동영상,등반일, 난이도 선택은 필수에요.');
    },
  });
};

//클라이밍장 포스트 삭제 함수 
export const usePostDetailDelete = (postid: string, gymId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: ['postDetailDelete'],
    mutationFn: () => instance.delete(`/api/posts/${postid}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['climbList'] });
      router.push(`/climbList/${gymId}`);
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      showModalHandler('alert', '삭제가 되지 않았어요');
    },
  });
};

//클라이밍장 동영상 개별 삭제 함수 

export const useVideoDelete = () => {
  const queryClient = useQueryClient();
  const videoDelete = useMutation({
    mutationKey: ['videoDelete'],
    mutationFn: (url: { videoUrl: string; thumbnailUrl: string }) =>
      instance.post(`/api/videos/delete`, url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfileData'] });
      // queryClient.invalidateQueries({ queryKey: ['climbDetail'] });
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });
  return videoDelete;
};

//클라이밍장별 공지 조회
export const fetchNoticeData = async (gymId: string, noticeId: string) => {
  const res = await instance.get(`/api/gyms/${gymId}/notice/${noticeId}`);
  return res.data;
};
