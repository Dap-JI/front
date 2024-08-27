import instance from '@/src/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BoardCommentUploadType } from '@/src/utils/type';

type boardListGetDatasProps = {
  page: number;
  search: string;
};

export const boardListGetDatas = async ({
  page,
  search,
}: boardListGetDatasProps) => {
  const res = await instance.get(`/api/boards`, {
    params: {
      page,
      search,
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
  const imageDelete = useMutation({
    mutationKey: ['boardImageDelete'],
    mutationFn: (imageUrl: string) =>
      instance.post(`/api/images/board-image/delete`, imageUrl),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['userProfileData'] });
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
    },
  });
  return imageDelete;
};

// /api/images/board-image/delete ,  바디에 url

//게시판 상세 데이터
export const boardDetailGetDatas = async (boardId: string) => {
  const res = await instance.get(`api/board/${boardId}`);
  return res.data;
};

//게시판 상세 수정 데이터

//게시판 삭제 데이터
export const boardDeleteData = async (board_idx: number) => {
  const res = await instance.delete(`/api/board/${board_idx}`);
  return res.data;
};

//게시판  댓글 데이터
export const boardDetailCommentGetDatas = async (boardId: string) => {
  const res = await instance.get(`api/comment/${boardId}`);
  return res.data;
};

//게시판 댓글 셍성 데이터
export const boardCommentUploadData = async (
  formData: BoardCommentUploadType,
) => {
  const res = await instance.post(`/api/comment`, formData);
  return res.data;
};

//게시판 댓글 삭제 데이터
export const boardCommentDeleteData = async (comment_idx: number) => {
  const res = await instance.delete(`/api/comment/${comment_idx}`);
  return res.data;
};
