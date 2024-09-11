'use client';
import classNames from 'classnames/bind';
import styles from './detailMainContent.module.scss';
import { DoubleRightArrowIcon, CommentIcon } from '@/public/icon';
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
import LikeAction from '@/src/components/common/likeAction';

import useTimeAgo from '@/src/hooks/useTimeAgo';
import { useLikeAction } from '@/src/hooks/useLikeAction';
import CommentCount from '@/src/components/common/commentCount';
import Link from 'next/link';

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
  const {
    color,
    User,
    clearday,
    content,
    post_idx,
    media,
    gym_idx,
    user_idx,
    createdAt,
    like_count,
    is_like,
    post_comment,
    post_comment_count,
  } = list;
  //리스트 데이터들

  const timeAgo = useTimeAgo(createdAt);
  const { likeCount, likeToggle, handleLikeClick } = useLikeAction({
    category: 'posts',
    content_id: post_idx,
    initalLikeCount: like_count,
    initalLikeToggle: is_like,
    firQueryKeyName: 'climbDetail',
    secQueryKeyName: 'postDetailDatas',
  });

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

  const profileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/profile/${user_idx}`);
  };
  // 프로필 클릭

  return (
    <div className={cn('container')} onClick={postDetailPage}>
      <div className={cn('userWrapper')}>
        <div className={cn('userInfo')} onClick={profileClick}>
          <Image
            src={User.img || '/icon/icon.png'}
            width="30"
            height="30"
            alt="userImg"
          />
          <div className={cn('dateWrapper')}>
            <span>{User.nickname}</span>
            <span>{timeAgo}</span>
          </div>
        </div>
        <DoubleRightArrowIcon />
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
        <div className={cn('iconWrapper')}>
          <LikeAction
            likeToggle={likeToggle}
            likeCount={likeCount}
            onClick={handleLikeClick}
          />
          <CommentCount count={post_comment_count} />
        </div>
        <div className={cn('clearday')}>
          <span>등반일 : {deleteT(clearday)}</span>
          <div className={cn('difficultyWrapper')}>
            <span>난이도 </span>
            <div className={cn('color', `color-${color}`)} />
          </div>
        </div>
      </div>

      <pre>{content}</pre>
      {post_comment[0]?.content && (
        <div className={cn('commentWrapper')}>
          <span className={cn('allComment')}>
            <Link
              href={`/climbList/${gym_idx}/${post_idx}`}
              style={{ textDecoration: 'none', color: 'gray' }}
            >
              댓글 모두 보기
            </Link>
          </span>
          <div className={cn('comment')}>
            <span>{post_comment[0].User.nickname}</span>
            <span>{post_comment[0].content}</span>
          </div>
        </div>
      )}
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
