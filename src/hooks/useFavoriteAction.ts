import { useMutation } from '@tanstack/react-query';
import instance from '../utils/axios';
import { useState } from 'react';

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

  const { mutate: favoriteRequest } = useMutation({
    mutationKey: ['favoriteRequest'],
    mutationFn: () => favoriteRequestData(gymId),
    onSuccess: () => {
      setFavoriteToggle((perv) => !perv);
    },
    onError: (e) => {
      console.error(e, '페이보릿실패');
    },
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    favoriteRequest();
  };

  return { handleFavoriteClick, favoriteToggle };
};

export default useFavoriteAction;
