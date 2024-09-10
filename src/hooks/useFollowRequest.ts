import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFollowPost } from '../app/profile/api';
import { useState } from 'react';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import { FollowRequestType } from '@/src/utils/type';

type UseFollowRequestProps = {
  initalFollowToggle: boolean;
  userId: string;
};

const useFollowRequest = ({
  initalFollowToggle,
  userId,
}: UseFollowRequestProps) => {
  const queryClient = useQueryClient();
  const [isFollow, setIsFollow] = useState(initalFollowToggle);
  const { myId } = useMyInfoStore();

  const { mutate: followRequest } = useMutation({
    mutationKey: ['followRequest'],
    mutationFn: (followIds: FollowRequestType) => fetchFollowPost(followIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileDatas'] });
    },
    onError: (e) => {
      console.error(e, '팔로우 실패');
    },
  });

  const handleFollowRequest = () => {
    const followIds = {
      follower_idx: myId,
      following_idx: userId,
    };
    setIsFollow((prev) => !prev);
    followRequest(followIds);
  };
  return { initalFollowToggle, userId, handleFollowRequest, isFollow };
};

export default useFollowRequest;
