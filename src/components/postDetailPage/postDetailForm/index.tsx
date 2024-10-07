'use client';
import React from 'react';
import styles from './postDetailForm.module.scss';
import classNames from 'classnames/bind';
import { DeleteIcon, EditIcon } from '@/public/icon';
import { useRouter } from 'next/navigation';
import { usePostDetailDelete } from '@/src/app/climbList/api';
import { useMyInfoStore } from '@/src/utils/store/useMyImfoStore';
import Image from 'next/image';
import { useModal } from '@/src/hooks/useModal';
import LinkShare from '@/src/components/common/linkShare';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Slider from 'react-slick';
import useTimeAgo from '@/src/hooks/useTimeAgo';
import LikeAction from '../../common/likeAction';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import { PostDetailDataType } from '@/src/utils/type';
import CommentCount from '@/src/components/common/commentCount';

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
    post_comment_count,
    gym_name,
  } = postDetailDatas;

  const { likeCount, likeToggle, handleLikeClick } = useLikeAction({
    category: 'posts',
    content_id: post_idx,
    initalLikeCount: like_count,
    initalLikeToggle: is_liked,
    firQueryKeyName: 'postDetailDatas',
    secQueryKeyName: 'climbPost',
  });

  const router = useRouter();

  const { mutate: postDetailDelete } = usePostDetailDelete(post_idx, gym_idx);

  const { myId } = useMyInfoStore();

  const { showModalHandler } = useModal();

  const timeAgo = useTimeAgo(createdAt);
  //시간 ~~전 표기하는 함수
  const isNotMyId = myId !== user_idx;
  //내 유저 id랑 게시물 유저 id비교
  const deleteT = (date: string | null) => date?.split('T')[0];
  //시간 가공하는 함수
  const editPage = () => {
    router.replace(`/climbList/${gym_idx}/${post_idx}/edit`);
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

  return (
    <div className={cn('container', { hasComment: post_comment_count > 0 })}>
      <div className={cn('userWrapper')}>
        <div className={cn('userInfo')} onClick={profileClick}>
          <Image
            src={User.img || process.env.NEXT_PUBLIC_URL + '/icon/icon.png'}
            width="30"
            height="30"
            alt="userImg"
          />
          <div className={cn('dateWrapper')}>
            <span>{User.nickname}</span>
            <span>{timeAgo}</span>
          </div>
        </div>
        <div className={cn('btnStyle')}>
          {!isNotMyId && (
            <>
              <EditIcon onClick={editPage} />
              <DeleteIcon onClick={deleteClick} />
            </>
          )}
          <LinkShare params={params} />
        </div>
      </div>

      <div className={cn('videoWrapper')}>
        <StyledSlider {...settings}>
          {media?.map((url: string, index: number) => (
            <div key={index} className={cn('videoBox')}>
              <video
                src={url}
                muted={true}
                autoPlay
                playsInline
                controls
                controlsList="nodownload"
              />
            </div>
          ))}
        </StyledSlider>
      </div>
      <div className={cn('contentWrapper')}>
        <div className={cn('iconWrapper')}>
          <LikeAction
            likeToggle={likeToggle}
            likeCount={likeCount}
            onClick={handleLikeClick}
          />
          <CommentCount count={post_comment_count} />
        </div>

        <div className={cn('clearday')}>
          <div className={cn('difficultyWrapper')}>
            <span>{gym_name} | </span>
            <span>난이도</span>
            <div className={cn('color', `color-${color}`)} />
          </div>

          <span>등반일 : {deleteT(clearday)}</span>
        </div>
      </div>
      {content && <pre>{content}</pre>}
    </div>
  );
};

export default PostDetailForm;
