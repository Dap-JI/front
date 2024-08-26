import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import instance from '@/src/utils/axios';

type LikeRequestProps = {
  category: string;
  content_id: string;
};

export const LikeRequest = async ({
  category,
  content_id,
}: LikeRequestProps) => {
  const res = await instance.post(`/api/${category}/${content_id}/like`);
  return res.data;
};

export const useLikeRequest = () => {
  return useMutation({});
};
