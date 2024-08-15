'use client';
import classNames from 'classnames/bind';
import styles from './detailMainContent.module.scss';
import { DoubleRightArrowIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import {
  DetailMainContentProps,
  DetailType,
  DetailMainContentListProps,
} from '@/src/utils/type';
import usePostStore from '@/src/utils/store/usePostStore';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const cn = classNames.bind(styles);

export const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    opacity: 0.5;
    padding: 0 15px;
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
  const router = useRouter();
  const setPostData = usePostStore((state) => state.setPostData);

  const postDetailPage = () => {
    setPostData(list);
    router.push(`/climbList/${gym_idx}/${post_idx}`);
  };

  const deleteT = (date: string | null) => date?.split('T')[0];

  const profileClick = () => {
    router.push(`/profile/${user_idx}`);
  };

  return (
    <div className={cn('container')}>
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
      <div className={cn('infoWrapper')}>
        <div className={cn('color', `color-${color}`)} />
        <span>{deleteT(clearday)}</span>
        <div className={cn('userWrapper')} onClick={profileClick}>
          <Image src={User.img} width="24" height="24" alt="userImg" />
          <span>{User.nickname}</span>
        </div>
        <DoubleRightArrowIcon onClick={postDetailPage} />
      </div>
      <p>{content}</p>
    </div>
  );
};
//여기도 비디오 배열로 , react-slick

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
