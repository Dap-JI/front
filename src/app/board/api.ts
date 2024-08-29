import instance from '@/src/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useModal } from '@/src/hooks/useModal';

type boardListGetDatasProps = {
  page: number;
  search: string;
  category: string | null;
};

//게시판 전체 조회
export const boardListGetDatas = async ({
  page,
  search,
  category,
}: boardListGetDatasProps) => {
  const res = await instance.get(`/api/boards`, {
    params: {
      page,
      search,
      category,
    },
  });
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
  const { showModalHandler } = useModal();
  const imageDelete = useMutation({
    mutationKey: ['boardImageDelete'],
    mutationFn: (imageUrl: string) =>
      instance.post(`/api/images/board-image/delete`, imageUrl),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['userProfileData'] });
    },
    onError: (error) => {
      showModalHandler('alert', '이미지 삭제를 다시 시도해 주세요');
      console.error('삭제 실패:', error);
    },
  });
  return imageDelete;
};

//게시판 상세 조회
export const boardDetailGetDatas = async (boardId: string) => {
  const res = await instance.get(`api/board/${boardId}`);
  return res.data;
};

//게시판 상세 수정
export const boardUpdateData = async (board_idx: string, formData: any) => {
  const res = await instance.patch(`/api/board/${board_idx}`, formData);
  return res.data;
};

//게시판 상세 삭제
export const boardDeleteData = async (board_idx: string) => {
  const res = await instance.delete(`/api/board/${board_idx}`);
  return res.data;
};
