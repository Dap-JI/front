'use client';
import React, { useState } from 'react';
import styles from './postDetailForm.module.scss';
import classNames from 'classnames/bind';
import { DeleteIcon, EditIcon } from '@/public/icon';
import LoadingSpinner from '../../common/loadingSpinner';
import { useRouter } from 'next/navigation';
import {
  usePostDetailDatas,
  usePostDetailDelete,
} from '@/src/app/climbList/api';
import { useMyInfoStore } from '@/src/hooks/useMyImfoStore';
import Image from 'next/image';
import { useModal } from '@/src/hooks/useModal';
import ModalChoice from '../../common/moadlChoice';
import LinkAndKakaoShare from '@/src/components/common/linkAndkakaoShare';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Slider from 'react-slick';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import VideoLike from '../../climbListDetailPage/videoLike';
import { VideoLikeRequest } from '@/src/app/climbList/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VideoLikeType } from '@/src/utils/type';
const cn = classNames.bind(styles);

export const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    opacity: 0.5;
    padding: 0;
  }

  .slick-center {
    opacity: 1 !important;
  }

  .slick-track {
    display: flex;
    justify-content: center;
  }
`;
type PostDetailFormProps = {
  params: { postid: string; gymId: string };
};

const PostDetailForm = ({ params }: PostDetailFormProps) => {
  const router = useRouter();
  const { postid, gymId } = params;
  const { data: postDetailDatas, isLoading } = usePostDetailDatas(postid);
  const { mutate: postDetailDelete } = usePostDetailDelete(postid, gymId);
  const { userId } = useMyInfoStore();
  const { showModalHandler } = useModal();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    draggable: true,
  };

  const [likeToggle, setLikeToggle] = useState(false);
  const [likeCount, setLikeCount] = useState(postDetailDatas?.like_count || 0);

  // like state
  const queryClient = useQueryClient();
  const { mutate: likeRequest } = useMutation({
    mutationKey: ['videoLiked', postid], // mutationKey에서 post_idx를 postid로 변경
    mutationFn: () => VideoLikeRequest(postid), // post_idx를 postid로 변경
    onSuccess: () => {
      setLikeToggle((prev) => !prev);
      setLikeCount((prev: number) => (likeToggle ? prev - 1 : prev + 1));
      queryClient.invalidateQueries({ queryKey: ['postDetailDatas'] });
      queryClient.invalidateQueries({ queryKey: ['climbDetail'] });
    },
    onError: (e) => {
      console.error(e, 'like에러');
    },
  });

  const timeAgo = useTimeAgo(postDetailDatas?.createdAt || '');

  if (isLoading || !postDetailDatas) {
    return <LoadingSpinner />;
  }

  const {
    gym_idx,
    post_idx,
    media,
    color,
    clearday,
    User,
    content,
    user_idx,
    createdAt,
  } = postDetailDatas;

  const isNotMyUserId = userId !== user_idx;

  const deleteT = (date: string | null) => date?.split('T')[0];

  const editPage = () => {
    router.push(`/climbList/${gym_idx}/${post_idx}/edit`);
  };

  const deleteClick = () => {
    const confirmAction = () => {
      postDetailDelete();
    };
    showModalHandler('choice', '정말 삭제하시겠어요?', confirmAction);
  };

  const profileClick = () => {
    router.push(`/profile/${user_idx}`);
  };

  const handleLikeClick = () => {
    likeRequest();
  };

  return (
    <div className={cn('container')}>
      <div className={cn('userWrapper')}>
        <div className={cn('userInfo')} onClick={profileClick}>
          <Image src={User.img} width="30" height="30" alt="userImg" />
          <div className={cn('dateWrapper')}>
            <span>{User.nickname}</span>
            <span>{timeAgo}</span>
          </div>
        </div>
        <div className={cn('btnStyle')}>
          {!isNotMyUserId && (
            <>
              <EditIcon onClick={editPage} />
              <DeleteIcon onClick={deleteClick} />
            </>
          )}
          <LinkAndKakaoShare params={params} />
        </div>
      </div>

      <div className={cn('videoWrapper')}>
        <StyledSlider {...settings}>
          {media?.map((url: string, index: number) => (
            <div key={index} className={cn('videoBox')}>
              <video
                src={url}
                autoPlay
                muted
                controls
                playsInline
                controlsList="nodownload"
              />
            </div>
          ))}
        </StyledSlider>
      </div>

      <div className={cn('contentWrapper')}>
        <div className={cn('difficultyWrapper')}>
          <span>난이도 :</span>
          <div className={cn('color', `color-${color}`)} />
        </div>
        <span className={cn('clearday')}>등반일 : {deleteT(clearday)}</span>
        <VideoLike
          likeToggle={likeToggle}
          likeCount={likeCount}
          onClick={handleLikeClick}
        />
      </div>

      <p>{content}</p>
      <ModalChoice />
    </div>
  );
};

export default PostDetailForm;

//다른사람이 볼때 수정 삭제는 안보임
// 수정페이지 안에 삭제 넣기
//myinfo랑 비교하기
