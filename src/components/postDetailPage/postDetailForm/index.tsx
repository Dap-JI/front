'use client';
import React, { useState } from 'react';
import styles from './postDetailForm.module.scss';
import classNames from 'classnames/bind';
import { DeleteIcon, EditIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import { usePostDetailDelete } from '@/src/app/climbList/api';
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
import { PostDetailDataType } from '@/src/utils/type';

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

type PostDetailFormProps = {
  params: { postid: string; gymId: string };
  postDetailDatas: PostDetailDataType;
};

const PostDetailForm = ({ params, postDetailDatas }: PostDetailFormProps) => {
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
    like_count,
    is_liked,
  } = postDetailDatas;

  const router = useRouter();

  const { mutate: postDetailDelete } = usePostDetailDelete(post_idx, gym_idx);

  const { myId } = useMyInfoStore();

  const { showModalHandler } = useModal();

  const [likeToggle, setLikeToggle] = useState(is_liked);

  const [likeCount, setLikeCount] = useState(like_count);

  const queryClient = useQueryClient();

  const { mutate: likeRequest } = useMutation({
    mutationKey: ['videoLiked', post_idx],
    mutationFn: () => VideoLikeRequest(post_idx),
    onMutate: async () => {
      //서버에 요청되기 전에 실행되는 코드
      await queryClient.cancelQueries({ queryKey: ['postDetailDatas'] });
      //서버에서 데이터를 가져오는 중이라면 취소, 데이터 중첩 안되도록
      const previousData = queryClient.getQueryData(['postDetailDatas']);
      //현재 캐시된 데이터
      setLikeToggle((prev) => !prev);
      setLikeCount((prev) => (likeToggle ? prev - 1 : prev + 1));
      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['postDetailDatas'], context.previousData);
      }
      //onMutate에서 반환된 previousData를 사용하여 실패한 요청 이전의 상태로 롤백.
      //이 작업을 통해 사용자는 서버 요청이 실패하더라도 이전의 정확한 상태를 볼 수 있게 된다..
    },
    onSettled: () => {
      //성공해도, 실패해도 해당 쿼리키를 최신화
      queryClient.invalidateQueries({ queryKey: ['postDetailDatas'] });
      queryClient.invalidateQueries({ queryKey: ['climbDetail'] });
    },
  });

  const timeAgo = useTimeAgo(createdAt);
  //시간 ~~전 표기하는 함수
  const isNotMyUserId = myId !== user_idx;
  //내 유저 id랑 게시물 유저 id비교
  const deleteT = (date: string | null) => date?.split('T')[0];
  //시간 가공하는 함수
  const editPage = () => {
    router.push(`/climbList/${gym_idx}/${post_idx}/edit`);
  };
  //수정페이지 이동
  const deleteClick = () => {
    const confirmAction = () => {
      postDetailDelete();
    };
    showModalHandler('choice', '정말 삭제하시겠어요?', confirmAction);
  };
  //삭제 함수
  const profileClick = () => {
    router.push(`/profile/${user_idx}`);
  };
  //프로필 이동

  const handleLikeClick = () => {
    likeRequest();
  };
  //좋아요 클릭

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
