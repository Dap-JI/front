import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import instance from '@/src/utils/axios';

type LikeRequestProps = {
  category: string;
  content_id: string;
};

const LikeRequestData = async ({ category, content_id }: LikeRequestProps) => {
  const res = await instance.post(`/api/${category}/${content_id}/like`);
  return res.data;
};

type LikeActionState = {
  likeToggle: boolean;
  likeCount: number;
  handleLikeClick: (e: React.MouseEvent) => void;
};

type useLikeActionProps = {
  category: string;
  content_id: string;
  initalLikeToggle: boolean;
  initalLikeCount: number;
  firQueryKeyName?: string;
  secQueryKeyName?: string;
};

export const useLikeAction = ({
  category,
  content_id,
  initalLikeCount,
  initalLikeToggle,
  firQueryKeyName,
  secQueryKeyName,
}: useLikeActionProps): LikeActionState => {
  const [likeToggle, setLikeToggle] = useState(initalLikeToggle);
  const [likeCount, setLikeCount] = useState(initalLikeCount);

  const queryClient = useQueryClient();

  const { mutate: likeRequest } = useMutation({
    mutationKey: ['LikeRequest'],
    mutationFn: () => LikeRequestData({ category, content_id }),
    onMutate: async () => {
      await queryClient.invalidateQueries({ queryKey: [`${firQueryKeyName}`] });
      const previousData = queryClient.getQueryData([`${firQueryKeyName}`]);
      setLikeToggle((prev) => !prev);
      setLikeCount((prev) => (initalLikeToggle ? prev - 1 : prev + 1));
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([`${firQueryKeyName}`], context.previousData);
      }
    },
    onSettled: () => {
      //성공해도, 실패해도 해당 쿼리키를 최신화
      queryClient.invalidateQueries({ queryKey: [`${firQueryKeyName}`] });
      queryClient.invalidateQueries({ queryKey: [`${secQueryKeyName}`] });
    },
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    likeRequest();
  };

  return { likeToggle, likeCount, handleLikeClick };
};
