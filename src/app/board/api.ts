import instance from '@/src/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const boardListDatas = async () => {
  const res = await instance.get(`/api/boards`);
  return res.data;
};

//게시판 업로드
export const boardUploadData = async (formData: any) => {
  const res = await instance.post(`/api/board`, formData);
  return res.data;
};

//게시판 이미지 삭제
export const useBoardImageDelete = () => {
  const queryClient = useQueryClient();
  const imageDelete = useMutation({
    mutationKey: ['boardImageDelete'],
    mutationFn: (imageUrl: string) =>
      instance.post(`/api/images/board-image/delete`, imageUrl),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['userProfileData'] });
      console.log('삭제 성공');
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });
  return imageDelete;
};
// /api/images/board-image/delete ,  바디에 url
