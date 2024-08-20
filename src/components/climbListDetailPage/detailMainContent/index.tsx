'use client';
import classNames from 'classnames/bind';
import styles from './detailMainContent.module.scss';
import { DoubleRightArrowIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import {
  DetailMainContentProps,
  DetailType,
  DetailMainContentListProps,
  VideoLikeType,
} from '@/src/utils/type';
import usePostStore from '@/src/utils/store/usePostStore';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import VideoLike from '@/src/components/climbListDetailPage/videoLike';
import { useState } from 'react';
import { VideoLikeRequest } from '@/src/app/climbList/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

const DetailMainContent = ({ list }: DetailMainContentProps) => {
  const { color, User, clearday, content, post_idx, media, gym_idx, user_idx } =
    list;
  //리스트 데이터들
  console.log(list)

  const [likeToggle, setLikeToggle] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  // like state
  const queryClient = useQueryClient();
  const { mutate: likeRequest } = useMutation({
    mutationKey: ['videoLiked', post_idx],
    mutationFn: () => VideoLikeRequest(post_idx),
    onSuccess: (data:VideoLikeType) => {
      setLikeToggle((prev) => !prev);
      setLikeCount(data.likeCount);
      queryClient.invalidateQueries({ queryKey: ['climbDetail'] });
    },
    onError: (e) => {
      console.error(e, 'like에러');
    },
  });

  //like post 요청 query
  console.log(likeCount);

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
  //슬라이드 세팅
  const router = useRouter();
  const setPostData = usePostStore((state) => state.setPostData);
  //postData 전역상태

  const postDetailPage = () => {
    setPostData(list);
    router.push(`/climbList/${gym_idx}/${post_idx}`);
  };
  // 영상 상세 페이지 이동

  const deleteT = (date: string | null) => date?.split('T')[0];
  // 시간 가공

  const profileClick = () => {
    router.push(`/profile/${user_idx}`);
  };
  // 프로필 클릭

  const handleLikeClick = () => {
    likeRequest();
  };
  //like 클릭

  return (
    <div className={cn('container')}>
      <div className={cn('userWrapper')} onClick={profileClick}>
        <div className={cn('userInfo')}>
          <Image src={User.img} width="24" height="24" alt="userImg" />
          <span>{User.nickname}</span>
        </div>
        <div>
          <DoubleRightArrowIcon onClick={postDetailPage} />
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
        <div className={cn('color', `color-${color}`)} />
        <span>{deleteT(clearday)}</span>
        <VideoLike
          likeToggle={likeToggle}
          likeCount={likeCount}
          onClick={handleLikeClick}
        />
      </div>
      <p>{content}</p>
    </div>
  );
};

const DetailMainContentList = ({ lists }: DetailMainContentListProps) => {
  return (
    <div className={cn('listContainer')}>
      {lists?.map((list: DetailType) => (
        <DetailMainContent key={list.post_idx} list={list} />
      ))}
    </div>
  );
};

export default DetailMainContentList;
