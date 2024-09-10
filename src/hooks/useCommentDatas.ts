import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import instance from '../utils/axios';
import { useModal } from './useModal';

// 댓글 조회

type CommentDatasProps = {
  content_id: string;
  page: number;
  category: string;
};

export const CommentDatas = async ({
  content_id,
  page,
  category,
}: CommentDatasProps) => {
  const res = await instance.get(`api/${category}/${content_id}`, {
    params: {
      page,
    },
  });
  return res.data;
};

// 댓글 생성

type useCommentUploadDataProps = {
  category: string;
  mainKey: string;
  firKey: string;
  secKey: string;
};

export const useCommentUploadData = ({
  category,
  mainKey,
  firKey,
  secKey,
}: useCommentUploadDataProps) => {
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: [`${mainKey}`],
    mutationFn: (formData: any) => instance.post(`/api/${category}`, formData),
    onSuccess: () => [
      queryClient.invalidateQueries({ queryKey: [`${firKey}`] }),
      queryClient.invalidateQueries({ queryKey: [`${secKey}`] }),
    ],
    onError: () => {
      showModalHandler('alert', '댓글을 다시 업로드해 주세요');
    },
  });
};

// 댓글 삭제

type useCommentDeleteDataProps = {
  category: string;
  content_id: string;
  mainKey: string;
  firKey: string;
};

export const useCommentDeleteData = ({
  category,
  content_id,
  mainKey,
  firKey,
}: useCommentDeleteDataProps) => {
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: [`${mainKey}`],
    mutationFn: () => instance.delete(`/api/${category}/${content_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${firKey}`] });
    },
    onError: () => {
      showModalHandler('alert', '댓글 삭제에 실패했어요');
    },
  });
};

/////////////////////////////////////////////

// 대댓글 조회
type useRecommentDataProps = {
  content_id: string;
  category: string;
  enabled: boolean;
  mainKey: string;
};

export const useRecommentData = ({
  content_id,
  category,
  mainKey,
  enabled,
}: useRecommentDataProps) => {
  return useInfiniteQuery({
    queryKey: [`${mainKey}`, content_id],
    queryFn: ({ pageParam = 1 }) =>
      instance
        .get(`/api/${category}/${content_id}`, {
          params: {
            page: pageParam,
          },
        })
        .then((response) => response.data),
    enabled,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNextPage) {
        return lastPage.meta.page + 1; // 다음 페이지 번호 반환
      }
      return undefined; // 더 이상 페이지가 없으면 undefined 반환
    },
    initialPageParam: 1, // 초기 페이지를 1로 설정
  });
};

// 답글 생성

type useRecommentUploadDataProps = {
  category: string;
  mainKey: string;
  firKey: string;
  secKey: string;
};

export const useRecommentUploadData = ({
  category,
  mainKey,
  firKey,
  secKey,
}: useRecommentUploadDataProps) => {
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: [`${mainKey}`],
    mutationFn: (formData: any) => instance.post(`/api/${category}`, formData),
    onSuccess: () => [
      queryClient.invalidateQueries({ queryKey: [`${firKey}`] }),
      queryClient.invalidateQueries({ queryKey: [`${secKey}`] }),
    ],
    onError: () => {
      showModalHandler('alert', '답글을 다시 업로드해 주세요');
    },
  });
};

// 대댓글 삭제

type useRecommentDeleteDataProps = {
  category: string;
  content_id: string;
  mainKey: string;
  firKey: string;
  secKey: string;
};

export const useRecommentDeleteData = ({
  category,
  content_id,
  mainKey,
  firKey,
  secKey,
}: useRecommentDeleteDataProps) => {
  const queryClient = useQueryClient();
  const { showModalHandler } = useModal();

  return useMutation({
    mutationKey: [`${mainKey}`],
    mutationFn: () => instance.delete(`/api/${category}/${content_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${firKey}`] });
      queryClient.invalidateQueries({ queryKey: [`${secKey}`] });
    },
    onError: () => {
      showModalHandler('alert', '답글 삭제에 실패했어요');
    },
  });
};
