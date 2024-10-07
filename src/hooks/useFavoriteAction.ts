import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '../utils/axios';
import { useState } from 'react';
import { useToast } from './useToast';

const favoriteRequestData = async (gymId: number) => {
  const res = await instance.post(`/api/gyms/${gymId}/favorite`);
  return res.data;
};

type useFavoriteActionProps = {
  initalFavoriteToggle: boolean;
  gymId: number;
};

const useFavoriteAction = ({
  initalFavoriteToggle,
  gymId,
}: useFavoriteActionProps) => {
  const [favoriteToggle, setFavoriteToggle] = useState(initalFavoriteToggle);
  const queryClient = useQueryClient();
  const { showToastHandler } = useToast();

  const { mutate: favoriteRequest } = useMutation({
    mutationKey: ['favoriteRequest'],
    mutationFn: () => favoriteRequestData(gymId),
    onSuccess: () => {
      setFavoriteToggle((perv) => !perv);
      queryClient.setQueryData(['climbList'], (oldData: any) => {
        if (!oldData) return oldData;

        return oldData.map((gym: any) => {
          if (gym.gymId === gymId) {
            // is_favorite 상태를 변경된 상태로 업데이트
            return { ...gym, is_favorite: !gym.is_favorite };
          }
          return gym;
        });
      });
    },
    onError: (e) => {
      console.error(e, '페이보릿실패');
    },
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    favoriteRequest();
    showToastHandler('즐겨찾기', 'check');
  };

  return { handleFavoriteClick, favoriteToggle };
};

export default useFavoriteAction;
